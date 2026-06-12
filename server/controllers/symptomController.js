const { Anthropic } = require('@anthropic-ai/sdk');

exports.suggestTests = async (req, res) => {
  const { symptoms } = req.body;
  
  if (!symptoms || typeof symptoms !== 'string' || !symptoms.trim()) {
    return res.status(400).json({ error: 'Symptoms description is required.' });
  }

  const nvidiaKey = process.env.NVIDIA_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!nvidiaKey && !anthropicKey) {
    console.log('[SymptomController] No AI API keys are configured (NVIDIA or Anthropic). Returning empty suggestions.');
    return res.status(200).json({ suggestions: [] });
  }

  // 1. Try NVIDIA API if available
  if (nvidiaKey) {
    try {
      console.log('[SymptomController] Initiating NVIDIA NIM test suggestion query...');
      
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${nvidiaKey}`,
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-8b-instruct',
          messages: [
            {
              role: 'system',
              content: `You are an expert medical assistant for ZELP, a diagnostic booking platform in India. Given the user's symptoms, analyze them and suggest 2-4 highly relevant diagnostic tests they should consider. You MUST ONLY recommend tests from the following list of available tests:
- Complete Blood Count (CBC)
- Lipid Profile (Cholesterol)
- Liver Function Test (LFT)
- Diabetes Screen (HbA1c + Glucose)
- Thyroid Profile (T3, T4, TSH)
- Kidney Function Test (KFT)
- Vitamin D (25-OH)
- Vitamin B12
- Full Body Health Checkup
- Urine Routine & Microscopy
- X-Ray Chest PA View
- Ultrasound Whole Abdomen
- MRI Brain (Plain)
- MRI Spine (Lumbar)
- MRI Knee Joint
- CT Scan Head (Plain)
- CT Scan Abdomen & Pelvis
- HRCT Chest (for Lungs)
- PET CT Scan (Whole Body)
- ECG (Resting)
- 2D Echocardiography
- Digital Mammography
- Color Doppler (Renal)
- DEXA Bone Density Scan
- Ultrasound Thyroid
- Ultrasound Pelvis (Female)
- X-Ray KUB (Kidney, Ureter, Bladder)
- Stress Test (TMT)
- Holter Monitoring (24hr)
- Spirometry (Lung Function)

Return ONLY a JSON array containing the test suggestions. Do NOT output markdown formatting, code blocks, or extra text. Format example: [{"test": "Complete Blood Count (CBC)", "reason": "To check for infection markers or anemia"}, {"test": "Thyroid Profile (T3, T4, TSH)", "reason": "To evaluate hormone levels"}]`
            },
            {
              role: 'user',
              content: symptoms
            }
          ],
          temperature: 0.2,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        throw new Error(`NVIDIA NIM API returned error code ${response.status}`);
      }

      const responseData = await response.json();
      const textContent = responseData.choices[0].message.content.trim();
      console.log('[SymptomController] Raw NVIDIA response:', textContent);

      const suggestions = parseSuggestions(textContent);
      return res.status(200).json({ suggestions });
    } catch (error) {
      console.error('[SymptomController] NVIDIA NIM query failed, trying fallback...', error);
      // If Anthropic key is not available, fail now, else fall through to Anthropic
      if (!anthropicKey) {
        return res.status(500).json({ error: 'Failed to retrieve AI suggestions via NVIDIA.' });
      }
    }
  }

  // 2. Fallback to Claude (Anthropic) if available
  if (anthropicKey) {
    try {
      console.log('[SymptomController] Initiating Anthropic Claude suggestion query...');
      
      const anthropic = new Anthropic({
        apiKey: anthropicKey,
      });

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are an expert medical assistant for ZELP, a diagnostic booking platform in India. Given the user's symptoms, analyze them and suggest 2-4 highly relevant diagnostic tests they should consider. You MUST ONLY recommend tests from the following list of available tests:
- Complete Blood Count (CBC)
- Lipid Profile (Cholesterol)
- Liver Function Test (LFT)
- Diabetes Screen (HbA1c + Glucose)
- Thyroid Profile (T3, T4, TSH)
- Kidney Function Test (KFT)
- Vitamin D (25-OH)
- Vitamin B12
- Full Body Health Checkup
- Urine Routine & Microscopy
- X-Ray Chest PA View
- Ultrasound Whole Abdomen
- MRI Brain (Plain)
- MRI Spine (Lumbar)
- MRI Knee Joint
- CT Scan Head (Plain)
- CT Scan Abdomen & Pelvis
- HRCT Chest (for Lungs)
- PET CT Scan (Whole Body)
- ECG (Resting)
- 2D Echocardiography
- Digital Mammography
- Color Doppler (Renal)
- DEXA Bone Density Scan
- Ultrasound Thyroid
- Ultrasound Pelvis (Female)
- X-Ray KUB (Kidney, Ureter, Bladder)
- Stress Test (TMT)
- Holter Monitoring (24hr)
- Spirometry (Lung Function)

Return ONLY a JSON array containing the test suggestions. Do NOT output markdown formatting, code blocks, or extra text. Format example: [{"test": "Complete Blood Count (CBC)", "reason": "To check for infection markers or anemia"}, {"test": "Thyroid Profile (T3, T4, TSH)", "reason": "To evaluate hormone levels"}]`,
        messages: [
          {
            role: 'user',
            content: symptoms,
          },
        ],
      });

      const textContent = response.content[0].text.trim();
      console.log('[SymptomController] Raw Claude response:', textContent);

      const suggestions = parseSuggestions(textContent);
      return res.status(200).json({ suggestions });
    } catch (error) {
      console.error('[SymptomController] Anthropic Claude query failed:', error);
      return res.status(500).json({ error: 'Failed to retrieve AI suggestions via Claude.' });
    }
  }
};

// Helper parser to extract JSON suggestions list cleanly
function parseSuggestions(textContent) {
  let cleanText = textContent.trim();
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.substring(7);
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.substring(3);
  }
  if (cleanText.endsWith('```')) {
    cleanText = cleanText.substring(0, cleanText.length - 3);
  }
  cleanText = cleanText.trim();

  let suggestions = [];
  try {
    suggestions = JSON.parse(cleanText);
  } catch (parseError) {
    console.error('[SymptomController] JSON parsing failed, attempting extraction:', parseError);
    const match = cleanText.match(/\[\s*\{.*\}\s*\]/s);
    if (match) {
      try {
        suggestions = JSON.parse(match[0]);
      } catch (innerError) {
        console.error('[SymptomController] Regex match parsing failed:', innerError);
      }
    }
  }

  // Double check that suggestions is an array
  if (!Array.isArray(suggestions)) {
    return [];
  }
  return suggestions;
}
