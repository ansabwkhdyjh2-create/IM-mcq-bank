import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// DATA — All unique questions extracted from uploaded files
// Color codes: Chest=green, Cardio=pink, Liver=blue, Hem=purple, GIT=yellow, Neuro=orange
// ============================================================
const ALL_QUESTIONS = [
  // ===== CARDIO =====
  {
    id: 1, section: "Cardio",
    q: "Which is false regarding edema in congestive heart failure?",
    options: ["Initially noticed in the morning", "Starts in the dependent part", "Pitting edema", "Sacral edema in non-ambulatory patients"],
    answer: 0
  },
  {
    id: 2, section: "Cardio",
    q: "Recent drugs used in treatment of congestive heart failure EXCEPT:",
    options: ["Digoxin", "ACE inhibitor", "Beta blockers", "Diuretics"],
    answer: 0
  },
  {
    id: 3, section: "Cardio",
    q: "Signs of left ventricular hypertrophy include:",
    options: ["Heaving apex", "Epigastric pulsation", "Tricuspid regurgitation", "Raised JVP"],
    answer: 0
  },
  {
    id: 4, section: "Cardio",
    q: "All of the following drugs are used in congestive cardiac failure EXCEPT:",
    options: ["Spironolactone", "Carvedilol", "Propranolol", "Digoxin"],
    answer: 2
  },
  {
    id: 5, section: "Cardio",
    q: "All of the following produce systemic hypertension EXCEPT:",
    options: ["Polycystic kidney", "Pheochromocytoma", "Addison's disease", "Conn's syndrome"],
    answer: 2
  },
  {
    id: 6, section: "Cardio",
    q: "Anti-hypertensive drug contraindicated in renal artery stenosis:",
    options: ["Losartan", "Verapamil", "Propranolol", "Spironolactone"],
    answer: 0
  },
  {
    id: 7, section: "Cardio",
    q: "Hypertension with diabetes is best treated by:",
    options: ["Beta-blocker", "Thiazide", "ACE inhibitor", "Calcium channel blockers"],
    answer: 2
  },
  {
    id: 8, section: "Cardio",
    q: "Hypertension occurs with:",
    options: ["Low Na+ intake", "Low K+ intake", "High Na+ intake", "All of the above"],
    answer: 3
  },
  {
    id: 9, section: "Cardio",
    q: "Which anti-hypertensive drug is contraindicated in a hypertensive patient with pheochromocytoma?",
    options: ["Labetalol", "Prazosin", "Phenoxybenzamine", "Guanethidine"],
    answer: 1
  },
  {
    id: 10, section: "Cardio",
    q: "Left atrial failure is featured by all EXCEPT:",
    options: ["Dependent oedema", "Paroxysmal nocturnal dyspnoea", "Fine crepitations at lung bases", "Gallop rhythm"],
    answer: 0
  },
  {
    id: 11, section: "Cardio",
    q: "Murmur of hypertrophic obstructive cardiomyopathy is decreased by:",
    options: ["Leg raising", "Valsalva manoeuvre", "Amyl nitrite inhalation", "Standing"],
    answer: 0
  },
  {
    id: 12, section: "Cardio",
    q: "Accelerated hypertension should NOT have:",
    options: ["Retinal haemorrhage", "Arteriovenous nipping", "Silver-wire arteries", "Papilloedema"],
    answer: 1
  },
  {
    id: 13, section: "Cardio",
    q: "All are true about Hypertrophic Obstructive Cardiomyopathy EXCEPT:",
    options: ["β-agonists are useful", "Asymmetrical hypertrophy of septum", "Dynamic LV outflow obstruction", "Condition improves on passive leg raising"],
    answer: 0
  },
  {
    id: 14, section: "Cardio",
    q: "Which of the following is the most common location of hypertensive haemorrhage?",
    options: ["Pons", "Putamen", "Thalamus", "Subcortical white matter"],
    answer: 1
  },
  {
    id: 15, section: "Cardio",
    q: "Episodic hypertension is a classical feature of:",
    options: ["Adrenal carcinoma", "Pheochromocytoma", "Conn's syndrome", "Cushing's disease"],
    answer: 1
  },
  {
    id: 16, section: "Cardio",
    q: "Pregnancy-associated hypertension should NOT be treated with:",
    options: ["Labetalol", "Telmisartan", "Alpha methyldopa", "Amlodipine"],
    answer: 1
  },
  {
    id: 17, section: "Cardio",
    q: "The recent biomarker for early detection of heart failure is:",
    options: ["Troponin I", "Myoglobin", "CKMB", "LDH", "ANP/BNP"],
    answer: 4
  },
  {
    id: 18, section: "Cardio",
    q: "Which drug is used in HF through increasing heart contractility by sliding actin on myosin and decreasing HR?",
    options: ["Digitalis", "Diuretics", "ACE inhibitors", "Beta-blockers", "Ca channel blockers"],
    answer: 0
  },
  {
    id: 19, section: "Cardio",
    q: "Most common cause of myocarditis is:",
    options: ["Viral infection", "Drug induced", "Autoimmune", "Fungal infection", "Trauma"],
    answer: 0
  },
  {
    id: 20, section: "Cardio",
    q: "Cardiomyopathy can result from which of the following?",
    options: ["Hypertension", "Congenital or acquired valvular abnormality", "Pericardial abnormalities", "All of the above"],
    answer: 3
  },
  {
    id: 21, section: "Cardio",
    q: "In diagnosis of restrictive cardiomyopathy, which has most relevance?",
    options: ["Atrial size", "Left ventricular diastolic dimension", "Left ventricular wall thickness", "Arrhythmia"],
    answer: 0
  },
  {
    id: 22, section: "Cardio",
    q: "Which of the following is a feature of cardiac remodeling?",
    options: ["Impaired ventricular systolic pump function", "Cardiac enlargement", "Cardiac hypertrophy", "All of the above"],
    answer: 3
  },
  {
    id: 23, section: "Cardio",
    q: "In which conditions is dilated cardiomyopathy reversible?",
    options: ["Alcohol abuse", "Pregnancy", "Thyroid disease", "All of the above"],
    answer: 3
  },
  {
    id: 24, section: "Cardio",
    q: "Which virus most often produces clinically significant acute myocarditis?",
    options: ["Influenza", "Coxsackievirus A", "Coxsackievirus B", "HIV"],
    answer: 2
  },
  {
    id: 25, section: "Cardio",
    q: "68-year-old male presented with severe central chest pain referred to the back, with unequal pulse volume. Most appropriate diagnosis?",
    options: ["Myocardial infarction", "Aortic dissecting aneurysm", "Bacterial pneumonia", "Pleuritic chest pain", "Cardiomegaly"],
    answer: 1
  },
  {
    id: 26, section: "Cardio",
    q: "Which is not a compensatory mechanism for heart failure?",
    options: ["Stimulation of sympathetic nervous system", "Stimulation of renin angiotensin system", "Hypertrophy of the heart", "Elevated BP", "Increased O2 extraction"],
    answer: 3
  },
  {
    id: 27, section: "Cardio",
    q: "Orthopnea may occur in:",
    options: ["Left sided heart failure", "Right sided heart failure", "Pyramidal lesions", "Acute cerebellar lesions", "Epilepsy"],
    answer: 0
  },
  {
    id: 28, section: "Cardio",
    q: "Which is NOT advocated in treatment of acute pulmonary edema?",
    options: ["Diuretics", "Trendelenburg position", "Morphine", "Rotating tourniquets", "Vasodilator"],
    answer: 1
  },
  {
    id: 29, section: "Cardio",
    q: "Types of shock do NOT include:",
    options: ["Hypovolemic", "Cardiogenic", "Septic", "Distributive", "Hypertensive"],
    answer: 4
  },
  {
    id: 30, section: "Cardio",
    q: "Causes of LVH do NOT include:",
    options: ["Aortic stenosis", "Ventricular septal defect", "Mitral stenosis", "Systemic HTN", "Mitral regurgitation"],
    answer: 2
  },
  {
    id: 31, section: "Cardio",
    q: "Which is true about pulsus paradoxus?",
    options: ["The pulse rate increases with inspiration", "The pulse rate decreases with inspiration", "Caused by severe aortic stenosis", "Caused by essential hypertension", "The pulse volume decreases with inspiration"],
    answer: 4
  },
  {
    id: 32, section: "Cardio",
    q: "Pulsus paradoxus occurs in:",
    options: ["Acute severe asthma", "Systemic hypertension", "Bacterial pneumonia", "Myocarditis", "Aortic regurgitation"],
    answer: 0
  },
  {
    id: 33, section: "Cardio",
    q: "Cor pulmonale means:",
    options: ["RV failure due to mitral stenosis", "RV failure due to LV failure", "RV failure due to lung disease", "RV failure due to VSD", "LVH"],
    answer: 2
  },
  {
    id: 34, section: "Cardio",
    q: "Which physical signs may indicate left ventricular failure?",
    options: ["Pulsus alternans", "Accentuated 1st heart sound", "Elevated systolic blood pressure", "Digital clubbing", "Congested pulsating neck veins"],
    answer: 0
  },
  {
    id: 35, section: "Cardio",
    q: "Right sided heart failure does NOT include:",
    options: ["Increased JVP", "Bilateral ankle edema", "Enlarged tender liver", "Ascites", "Bilateral basal lung crackles"],
    answer: 4
  },
  {
    id: 36, section: "Cardio",
    q: "The best vasodilator used in treatment of chronic HF is:",
    options: ["Calcium channel blocker", "Na nitroprusside", "ACE inhibitors", "Alpha blocker", "Hydralazine"],
    answer: 2
  },
  {
    id: 37, section: "Cardio",
    q: "The most important investigation to assess ejection fraction:",
    options: ["ECG", "Echocardiography", "Chest X-ray", "Cardiac scan", "MRI heart"],
    answer: 1
  },
  {
    id: 38, section: "Cardio",
    q: "Slow rising pulse is a feature of:",
    options: ["Endotoxic shock", "Aortic stenosis", "Mitral stenosis", "Constrictive pericarditis", "Aortic regurgitation"],
    answer: 1
  },
  {
    id: 39, section: "Cardio",
    q: "A patient with arterial BP 135/85 needs:",
    options: ["Lifestyle modification", "Angiotensin receptor blocker", "Beta-blocker", "Alpha blocker", "Calcium channel blockers"],
    answer: 0
  },
  {
    id: 40, section: "Cardio",
    q: "To establish diagnosis of hypertension we should:",
    options: ["Repeat BP measurement", "Depend on symptoms", "Measure once only", "Use arterial pulse", "Cardiac sounds"],
    answer: 0
  },
  {
    id: 41, section: "Cardio",
    q: "RAAS regulates arterial pressure primarily through:",
    options: ["Nitric oxide production", "Angiotensin II and aldosterone", "Epinephrine", "Endothelin production", "Dopamine production"],
    answer: 1
  },
  {
    id: 42, section: "Cardio",
    q: "Myocarditis is characterized by all EXCEPT:",
    options: ["Relative tachycardia", "Non-specific ECG changes", "Associated cardiac manifestations", "Elevated cardiac enzymes", "Hypertension"],
    answer: 4
  },
  {
    id: 43, section: "Cardio",
    q: "Syncope most often occurs secondary to:",
    options: ["Temporary cerebral ischemia", "Increased intracranial tension", "Heart attack", "Stroke", "Hypervolemia"],
    answer: 0
  },
  {
    id: 44, section: "Cardio",
    q: "Syncope best described by:",
    options: ["Prolonged state of disturbed conscious level", "Central crushing chest pain", "Sudden and transient loss of consciousness due to cerebral hypoperfusion", "Unilateral weakness", "Unsteadiness"],
    answer: 2
  },
  {
    id: 45, section: "Cardio",
    q: "Syncope most likely to occur when the patient is:",
    options: ["Sitting", "Supine", "Standing", "Kneeling", "Lying down"],
    answer: 2
  },
  {
    id: 46, section: "Cardio",
    q: "One of the following is a sign of vasovagal attack:",
    options: ["Tachycardia", "Tonic seizure", "Constricted pupil", "Bradycardia", "Epigastric discomfort"],
    answer: 3
  },
  {
    id: 47, section: "Cardio",
    q: "Paroxysmal hypertension is classically found in:",
    options: ["Coarctation of the aorta", "Eclampsia", "Renal artery stenosis", "Pheochromocytoma", "Conn's syndrome"],
    answer: 3
  },
  {
    id: 48, section: "Cardio",
    q: "Which antihypertensive drug commonly causes dry irritant cough?",
    options: ["ACE inhibitors", "Alpha receptor antagonists", "Beta adrenergic receptor antagonists", "Angiotensin receptor blockers", "Sympatholytic agents"],
    answer: 0
  },
  {
    id: 49, section: "Cardio",
    q: "Which can cause high cardiac output failure?",
    options: ["Coronary artery disease", "Mitral stenosis", "Thyrotoxicosis", "Myocarditis", "Pulmonary hypertension"],
    answer: 2
  },
  {
    id: 50, section: "Cardio",
    q: "One cardinal feature of shock is:",
    options: ["Elevated serum lactate", "Basal lung crackles", "Abdominal pain", "Fever", "Cyanosis"],
    answer: 0
  },
  {
    id: 51, section: "Cardio",
    q: "In symptomatic HCM, the most common complaint is:",
    options: ["Dyspnea", "Palpitation", "Angina pectoris", "Syncope"],
    answer: 0
  },
  {
    id: 52, section: "Cardio",
    q: "Left ventricular cavity in HCM is typically:",
    options: ["Small", "Normal", "Large", "Any of the above"],
    answer: 0
  },
  {
    id: 53, section: "Cardio",
    q: "Spironolactone is effective in patients with:",
    options: ["Low-renin essential hypertension", "Resistant hypertension", "Primary aldosteronism", "All of the above"],
    answer: 3
  },
  {
    id: 54, section: "Cardio",
    q: "Which drug is contraindicated in pregnancy-induced hypertension?",
    options: ["Hydralazine", "Enalapril", "Nifedipine", "Methyldopa", "Labetalol"],
    answer: 1
  },
  {
    id: 55, section: "Cardio",
    q: "Which is most appropriate antihypertensive in a diabetic patient with proteinuria?",
    options: ["Beta blockers", "ACE inhibitors", "Alpha blockers", "Calcium channel blockers", "Thiazide diuretics"],
    answer: 1
  },
  {
    id: 56, section: "Cardio",
    q: "Decapitated hypertension means:",
    options: ["Drop in BP due to heart failure", "Drop in BP due to thyrotoxicosis", "Drop in BP due to hypovolemia", "Drop in BP due to excess therapy", "Drop in BP due to salt wasting"],
    answer: 3
  },
  {
    id: 57, section: "Cardio",
    q: "One of the most reliable markers for renal injury and cardiovascular disease is:",
    options: ["Urea level", "Abnormal albumin excretion (albumin/creatinine ratio)", "K+ level", "Abnormal ECG", "Hematuria"],
    answer: 1
  },
  {
    id: 58, section: "Cardio",
    q: "Prevalence of hypertension varies among countries because of:",
    options: ["Genetic factors", "Social factors", "Both genetic and environmental factors", "Psychic stress", "Immunological factors"],
    answer: 2
  },
  {
    id: 59, section: "Cardio",
    q: "Typical anginal pain is NOT characterized by:",
    options: ["Retrosternal pain", "Heavy/pressing in character", "Tearing in character", "Increased with exertion", "Relieved by nitrates"],
    answer: 2
  },
  {
    id: 60, section: "Cardio",
    q: "Which of the following may cause sudden cardiac death in young age?",
    options: ["Viral myocarditis", "Hypertrophic obstructive cardiomyopathy", "Left ventricular failure", "Tricuspid regurgitation", "Angina pectoris"],
    answer: 1
  },
  {
    id: 61, section: "Cardio",
    q: "Which does NOT precipitate manifestations of heart failure?",
    options: ["Thyroid disease", "Chest infections", "Diabetes", "Excess IV fluids"],
    answer: 2
  },
  {
    id: 62, section: "Cardio",
    q: "Atrial fibrillation is distinguished from multiple extra-systoles by:",
    options: ["Pulse deficit more than 10/min", "Irregular rhythm", "Unequal pulse volume", "Slow heart rate", "Small pulse volume"],
    answer: 0
  },
  {
    id: 63, section: "Cardio",
    q: "Which feature most strongly suggests anginal origin of central chest pain?",
    options: ["Sharp stabbing pain worse with inspiration", "Pain relieved by antacids", "Pain precipitated by exertion and relieved by rest", "Localized tenderness over sternum", "Pain lasts seconds"],
    answer: 2
  },
  {
    id: 64, section: "Cardio",
    q: "Most useful in management of acute heart failure:",
    options: ["Levothyroxine", "Corticosteroids", "Antibiotics", "IV fluids", "Diuretic"],
    answer: 4
  },

  // ===== CHEST =====
  {
    id: 65, section: "Chest",
    q: "Apical bronchiectasis indicates:",
    options: ["Foreign body", "Tumor", "Tuberculosis", "Fibrosis"],
    answer: 2
  },
  {
    id: 66, section: "Chest",
    q: "Suppurative syndrome is characterized by all EXCEPT:",
    options: ["Excessive expectoration of fetid sputum", "Finger clubbing", "Bronchial hyper-reactivity", "Cough exacerbated by special position"],
    answer: 2
  },
  {
    id: 67, section: "Chest",
    q: "All are causes of bronchiectasis EXCEPT:",
    options: ["Inhaled foreign body", "Primary hypogammaglobulinemia", "Cystic fibrosis", "Sarcoidosis"],
    answer: 3
  },
  {
    id: 68, section: "Chest",
    q: "Complications of bronchiectasis include:",
    options: ["Cerebral abscess", "Pneumonia", "Empyema", "All of the above"],
    answer: 3
  },
  {
    id: 69, section: "Chest",
    q: "Atypical pneumonia is caused by:",
    options: ["Chlamydia pneumoniae", "Mycoplasma pneumoniae", "Legionella bacilli", "All of the above"],
    answer: 3
  },
  {
    id: 70, section: "Chest",
    q: "Pneumatocele is formed in pneumonia caused by:",
    options: ["Staphylococcus aureus", "Klebsiella pneumoniae", "Streptococcal pneumonia", "Mycoplasma pneumoniae"],
    answer: 0
  },
  {
    id: 71, section: "Chest",
    q: "In acute pneumonia the following is required EXCEPT:",
    options: ["Sputum examination", "Chest X-ray", "Pulmonary function test", "Blood picture"],
    answer: 2
  },
  {
    id: 72, section: "Chest",
    q: "Most common cause of hospital-acquired pneumonia:",
    options: ["Gram positive", "Gram negative", "Atypical organism"],
    answer: 1
  },
  {
    id: 73, section: "Chest",
    q: "Drug of choice in Mycoplasma pneumonia:",
    options: ["Penicillin", "Tetracycline", "Cefuroxime", "Erythromycin"],
    answer: 3
  },
  {
    id: 74, section: "Chest",
    q: "Most common cause of community-acquired pneumonia:",
    options: ["Group A Streptococcus", "Hemophilus influenzae", "Streptococcus pneumoniae", "Klebsiella pneumoniae", "Mycoplasma pneumoniae"],
    answer: 2
  },
  {
    id: 75, section: "Chest",
    q: "Finger clubbing is caused by which of the following?",
    options: ["Chronic bronchitis", "Bronchiectasis", "Viral pneumonia", "Myocarditis", "Chronic heart failure"],
    answer: 1
  },
  {
    id: 76, section: "Chest",
    q: "Increased TVF (tactile vocal fremitus) is due to:",
    options: ["Pleural effusion", "Lung consolidation", "Pulmonary fibrosis", "Pneumothorax", "Lung collapse"],
    answer: 1
  },
  {
    id: 77, section: "Chest",
    q: "All are typical features of asthma EXCEPT:",
    options: ["Eosinophilic bronchial infiltration", "Airway macrophage infiltration", "Epithelial shedding", "Goblet cell hypoplasia"],
    answer: 3
  },
  {
    id: 78, section: "Chest",
    q: "Which is included in obstructive lung diseases?",
    options: ["Asthma", "Bronchiectasis", "Bronchiolitis", "All of the above"],
    answer: 3
  },
  {
    id: 79, section: "Chest",
    q: "Acute shortness of breath is usually associated with:",
    options: ["Myocardial infarction", "Pulmonary embolism", "Pneumothorax", "All of the above"],
    answer: 3
  },
  {
    id: 80, section: "Chest",
    q: "Cough persisting for more than how many weeks is defined as chronic cough?",
    options: ["2 weeks", "4 weeks", "6 weeks", "8 weeks"],
    answer: 3
  },
  {
    id: 81, section: "Chest",
    q: "Chest pain from respiratory disease originates from involvement of:",
    options: ["Parietal pleura", "Visceral pleura", "Pulmonary parenchyma", "Bronchial airways"],
    answer: 0
  },
  {
    id: 82, section: "Chest",
    q: "Which is associated with smoking?",
    options: ["Spontaneous pneumothorax", "Respiratory bronchiolitis-ILD", "Pulmonary Langerhans cell histiocytosis", "All of the above"],
    answer: 3
  },
  {
    id: 83, section: "Chest",
    q: "Asymmetric expansion of the chest is due to:",
    options: ["Endobronchial obstruction of a large airway", "Unilateral parenchymal or pleural disease", "Unilateral phrenic nerve paralysis", "All of the above"],
    answer: 3
  },
  {
    id: 84, section: "Chest",
    q: "Which statement about asthma is false?",
    options: ["10-12% adults and 15% children affected", "Peak age of presentation is 3 years", "Sex ratio in adults is equal", "None of the above"],
    answer: 1
  },
  {
    id: 85, section: "Chest",
    q: "Treatment of COPD exacerbation does NOT include:",
    options: ["Bronchodilators", "Corticosteroids", "Aminophylline", "Antibiotics", "Levothyroxine"],
    answer: 4
  },
  {
    id: 86, section: "Chest",
    q: "Signs of respiratory difficulty include:",
    options: ["Working alae nasi and chest indrawings", "Chest tenderness", "Wide subcostal angle", "Epigastric pulsations"],
    answer: 0
  },
  {
    id: 87, section: "Chest",
    q: "In bronchial asthma, spirometry shows:",
    options: ["Reduced FEV1", "Increased PCO2", "Increased VC"],
    answer: 0
  },
  {
    id: 88, section: "Chest",
    q: "Main antibody in bronchial asthma is:",
    options: ["Immunoglobulin G", "Immunoglobulin M", "Immunoglobulin E"],
    answer: 2
  },
  {
    id: 89, section: "Chest",
    q: "Intrinsic asthma is characterized by all EXCEPT:",
    options: ["Onset of adult life", "High circulating IgE", "Sputum eosinophilia", "Good response to steroids"],
    answer: 1
  },
  {
    id: 90, section: "Chest",
    q: "Bronchial asthma wheeze is:",
    options: ["Inspiratory sibilant", "Sonorous", "Expiratory sibilant"],
    answer: 2
  },
  {
    id: 91, section: "Chest",
    q: "All drugs used in treatment of chronic persistent asthma EXCEPT:",
    options: ["Inhaled beta-2 agonist", "Systemic steroids", "Propranolol", "Inhaled steroids"],
    answer: 2
  },
  {
    id: 92, section: "Chest",
    q: "In status asthmaticus, bad prognosis sign is:",
    options: ["Severe tachycardia", "Central cyanosis", "Absent wheeze", "All of the above"],
    answer: 3
  },
  {
    id: 93, section: "Chest",
    q: "In emphysema there is encroachment on:",
    options: ["Hepatic dullness", "Cardiac dullness", "Both"],
    answer: 2
  },
  {
    id: 94, section: "Chest",
    q: "Breath sounds in emphysema are:",
    options: ["Diminished", "Absent", "Normal"],
    answer: 0
  },
  {
    id: 95, section: "Chest",
    q: "The specific diagnosis method in early COPD is:",
    options: ["Chest X-ray", "Blood gases", "Spirometry"],
    answer: 2
  },
  {
    id: 96, section: "Chest",
    q: "Indication of long-term oxygen therapy in COPD:",
    options: ["Exercise-induced arterial desaturation", "Comorbidities with ischemic heart disease", "Hypoxemia: PaO2 < 55 mmHg and SaO2 < 88%", "FEV1 < 35%", "Productive cough"],
    answer: 2
  },
  {
    id: 97, section: "Chest",
    q: "Differentiation between asthma and COPD may include:",
    options: ["Increased FEV1 by 15% following bronchodilators", "Audible rhonchi", "Chronic cough", "Acute attacks of dyspnea", "Diminished air entry"],
    answer: 0
  },
  {
    id: 98, section: "Chest",
    q: "One of the following is a cause of dyspnea of sudden onset:",
    options: ["Chronic heart failure", "Pulmonary embolism", "Interstitial lung fibrosis", "Morbid obesity", "Anemia"],
    answer: 1
  },
  {
    id: 99, section: "Chest",
    q: "Sarcoidosis is characterized by:",
    options: ["Extensive fibrosis", "Caseating granuloma", "Mild fibrosis", "Non-caseating granuloma", "Tumour-like growth"],
    answer: 3
  },
  {
    id: 100, section: "Chest",
    q: "Imaging of the chest in sarcoidosis may reveal:",
    options: ["Bilateral hilar lymphadenopathy and parenchymal involvement", "Pneumothorax", "Pneumonia", "Hydropneumothorax", "Lung abscess"],
    answer: 0
  },
  {
    id: 101, section: "Chest",
    q: "One of the following is NOT a common finding in sarcoidosis:",
    options: ["Fever", "Parotid enlargement", "Lymphadenopathy", "Hepatosplenomegaly", "Renal failure"],
    answer: 4
  },
  {
    id: 102, section: "Chest",
    q: "Sarcoidosis is a:",
    options: ["Pulmonary disease", "Neuro-pulmonary", "Multisystem disease", "Cardiopulmonary disease", "Hepatopulmonary"],
    answer: 2
  },
  {
    id: 103, section: "Chest",
    q: "Pulmonary infiltration in sarcoidosis occurs in:",
    options: ["Stage 1", "Stage 2", "Stage 3"],
    answer: 1
  },
  {
    id: 104, section: "Chest",
    q: "The most specific diagnostic test for sarcoidosis is:",
    options: ["Trans-bronchial biopsy", "Serum calcium level", "ACE enzyme assay", "Chest X-ray", "Erythema nodosum"],
    answer: 0
  },
  {
    id: 105, section: "Chest",
    q: "Bilateral hilar lymphadenopathy, erythema nodosum, arthralgia and fever define:",
    options: ["Cushing syndrome", "Conn's syndrome", "Pheochromocytoma", "Löfgren's syndrome", "Budd-Chiari syndrome"],
    answer: 3
  },
  {
    id: 106, section: "Chest",
    q: "Mantoux test is used to diagnose:",
    options: ["Tuberculosis", "Systemic sclerosis", "Sarcoidosis"],
    answer: 0
  },
  {
    id: 107, section: "Chest",
    q: "What is the indication of phosphodiesterase E4 inhibitor in COPD?",
    options: ["Heart failure", "Bronchiectasis", "Chronic bronchitis with history of exacerbation", "Pneumonia", "Diabetes mellitus"],
    answer: 2
  },
  {
    id: 108, section: "Chest",
    q: "Which is the diagnostic criterion for COPD on spirometry?",
    options: ["Post-bronchodilator FEV1 improvement < 15%", "Post-bronchodilator FEV1/FVC < 0.7", "Wheezy chest, cough and dyspnoea", "Cyanosis"],
    answer: 1
  },
  {
    id: 109, section: "Chest",
    q: "Most common cause of COPD exacerbation:",
    options: ["Irritant inhalation", "Chest infection", "Steroid therapy", "Bronchodilators", "O2 therapy"],
    answer: 1
  },
  {
    id: 110, section: "Chest",
    q: "Gold standard test for diagnosis of pulmonary embolism:",
    options: ["Echocardiography", "CT pulmonary angiography", "ECG", "Chest X-ray", "Arterial blood gases"],
    answer: 1
  },
  {
    id: 111, section: "Chest",
    q: "Most reliable symptom of acute pulmonary embolism:",
    options: ["Retrosternal chest pain", "Shortness of breath", "Syncope", "Cough", "Vomiting"],
    answer: 1
  },
  {
    id: 112, section: "Chest",
    q: "Surest clinical sign in emphysema:",
    options: ["Audible expiratory rhonchi", "Cyanosis", "Digital clubbing", "Audible lung crackles", "Encroachment on both hepatic and cardiac dullness"],
    answer: 4
  },
  {
    id: 113, section: "Chest",
    q: "Which does NOT cause bilateral hilar lymphadenopathy?",
    options: ["Sarcoidosis", "Pneumonia", "Lymphoma", "Pulmonary tuberculosis", "Bronchial carcinoma"],
    answer: 1
  },
  {
    id: 114, section: "Chest",
    q: "Spirometry in COPD usually reveals:",
    options: ["Obstructive lung pattern", "Restrictive lung pattern", "Normal pattern", "Mixed pattern", "Nonspecific changes"],
    answer: 0
  },
  {
    id: 115, section: "Chest",
    q: "Dullness of Kronig's isthmus is usually NOT seen in:",
    options: ["Pancoast lung tumor", "Apical lung fibrosis", "Apical pneumonia", "Post-primary pulmonary TB", "Bronchiectasis"],
    answer: 4
  },
  {
    id: 116, section: "Chest",
    q: "Worldwide commonest cause of hemoptysis is:",
    options: ["Pulmonary tuberculosis", "Bronchogenic carcinoma", "Chronic bronchitis", "Pneumonia", "Pulmonary embolism"],
    answer: 0
  },
  {
    id: 117, section: "Chest",
    q: "Woody dullness on chest percussion is classically found in:",
    options: ["Pleural effusion", "Thickened pleura", "Consolidation", "Lung collapse", "Interstitial fibrosis"],
    answer: 0
  },
  {
    id: 118, section: "Chest",
    q: "Most common cause of acute cor pulmonale:",
    options: ["Lobar consolidation", "Pneumothorax", "Pulmonary thromboembolism", "Fibrosing alveolitis", "Bronchial asthma"],
    answer: 2
  },
  {
    id: 119, section: "Chest",
    q: "Most commonly affected organ in sarcoidosis:",
    options: ["Lungs", "Heart", "Kidneys", "Skin", "Liver"],
    answer: 0
  },
  {
    id: 120, section: "Chest",
    q: "Restrictive lung disease will cause mainly:",
    options: ["Reduction in FEV1", "High FEV1/FVC ratio", "Low FEV1/FVC ratio", "Increase in FVC", "Increase in total lung capacity"],
    answer: 1
  },
  {
    id: 121, section: "Chest",
    q: "Rust-colored sputum is classically associated with pneumonia caused by:",
    options: ["Klebsiella pneumoniae", "Mycoplasma pneumoniae", "Streptococcus pneumoniae", "Pseudomonas aeruginosa", "Haemophilus influenzae"],
    answer: 2
  },
  {
    id: 122, section: "Chest",
    q: "Which clinical sign is most specific for lobar pneumonia?",
    options: ["Wheezing", "Dullness to percussion", "Decreased breath sounds throughout both lungs", "Bronchial breath sounds over affected area", "Fine inspiratory crackles"],
    answer: 3
  },
  {
    id: 123, section: "Chest",
    q: "Which is NOT a complication of pneumonia?",
    options: ["Pleural effusion", "Empyema", "Lung abscess", "Pleural adhesion", "Pancreatitis"],
    answer: 4
  },
  {
    id: 124, section: "Chest",
    q: "One sign of acute severe asthma:",
    options: ["Pulsus paradoxus", "Increased intensity of breath sounds", "Hypertension", "Big pulse volume", "Bradypnea"],
    answer: 0
  },
  {
    id: 125, section: "Chest",
    q: "Central cyanosis is NOT found in:",
    options: ["Fallot's tetralogy", "Transposition of great vessels", "Acute pulmonary edema", "Left-to-right shunt", "Asphyxia"],
    answer: 3
  },
  {
    id: 126, section: "Chest",
    q: "Hemoptysis does NOT occur in:",
    options: ["Left ventricular failure", "Bronchiectasis", "Goodpasture syndrome", "Tight mitral stenosis", "Pulmonary stenosis"],
    answer: 4
  },
  {
    id: 127, section: "Chest",
    q: "Hemoptysis is NOT common in:",
    options: ["Bronchiectasis", "ANCA-associated vasculitis", "Bronchogenic carcinoma", "Bronchial asthma", "Pulmonary tuberculosis"],
    answer: 3
  },
  {
    id: 128, section: "Chest",
    q: "Digital clubbing is NOT a common finding in:",
    options: ["Bronchiectasis", "Mesothelioma", "Bronchogenic carcinoma", "Interstitial lung disease", "COPD"],
    answer: 4
  },

  // ===== LIVER =====
  {
    id: 129, section: "Liver",
    q: "Aetiology of liver cirrhosis does NOT include:",
    options: ["Chronic viral hepatitis (B, C)", "Hemochromatosis", "Non-alcoholic fatty liver disease", "Alpha-1-antitrypsin deficiency", "Acute viral hepatitis (A)"],
    answer: 4
  },
  {
    id: 130, section: "Liver",
    q: "Female patient without known history, presented with marked elevation of liver enzymes, prolonged PT, encephalopathy. Most likely diagnosis:",
    options: ["Fulminant hepatic failure", "Gastroenteritis", "Peptic ulcer disease", "Bacterial pneumonia", "Myocarditis"],
    answer: 0
  },
  {
    id: 131, section: "Liver",
    q: "Hepatic coma is NOT precipitated by:",
    options: ["Hematemesis", "Protein intake", "Constipation", "Spontaneous bacterial peritonitis", "Hyperthyroidism"],
    answer: 4
  },
  {
    id: 132, section: "Liver",
    q: "Liver cell failure is characterized by all EXCEPT:",
    options: ["Spider nevi", "Hypoalbuminemia", "Esophageal varices", "Jaundice"],
    answer: 2
  },
  {
    id: 133, section: "Liver",
    q: "Important sign in liver cell failure:",
    options: ["Flapping tremors", "Fine tremors", "Intention kinetic tremors"],
    answer: 0
  },
  {
    id: 134, section: "Liver",
    q: "All of the following are presentations of hepatic coma EXCEPT:",
    options: ["Asterixis", "Absent deep reflex", "Abnormal ECG", "Increased ammonia"],
    answer: 1
  },
  {
    id: 135, section: "Liver",
    q: "In chronic active hepatitis, one of the following is found:",
    options: ["Deep jaundice", "Splenomegaly", "Intermittent fever", "All of the above"],
    answer: 3
  },
  {
    id: 136, section: "Liver",
    q: "Hepatitis C infection — which is correct?",
    options: ["The virus is DNA virus", "Short incubation period", "Patients are often asymptomatic", "Chronic hepatitis is rare"],
    answer: 2
  },
  {
    id: 137, section: "Liver",
    q: "Treatment of autoimmune hepatitis includes:",
    options: ["Ribavirin", "Interferon", "Corticosteroids"],
    answer: 2
  },
  {
    id: 138, section: "Liver",
    q: "Patient's serum contains only anti-Hepatitis B surface antibody. This means he is:",
    options: ["Acutely infected with Hepatitis B", "Suffering from chronic Hepatitis B infection", "Vaccinated", "Carrier with low level of Hepatitis B surface Ag"],
    answer: 2
  },
  {
    id: 139, section: "Liver",
    q: "Which Hepatitis C genotype is common in Egypt?",
    options: ["Genotype 1a", "Genotype 1b", "Genotype 2", "Genotype 3", "Genotype 4"],
    answer: 4
  },
  {
    id: 140, section: "Liver",
    q: "Which is false regarding Reye's syndrome?",
    options: ["Mitochondrial dysfunction of liver", "Salicylates may be responsible", "There may be cerebral oedema", "Survivors pass on to chronic liver disease"],
    answer: 3
  },
  {
    id: 141, section: "Liver",
    q: "All are recognized complications of acute viral hepatitis EXCEPT:",
    options: ["Polyarteritis nodosa", "Aplastic anaemia", "Meningitis", "Myocarditis"],
    answer: 2
  },
  {
    id: 142, section: "Liver",
    q: "Chronic hepatitis is liver disease lasting more than:",
    options: ["4 weeks", "3 months", "6 months", "7 months", "One year"],
    answer: 2
  },
  {
    id: 143, section: "Liver",
    q: "The most common cause of chronic viral hepatitis worldwide is:",
    options: ["Chronic hepatitis C", "Chronic hepatitis A", "Chronic hepatitis E", "Chronic hepatitis B", "Chronic hepatitis D"],
    answer: 3
  },
  {
    id: 144, section: "Liver",
    q: "Acute hepatitis B in adults progresses to chronic hepatitis B in:",
    options: ["3% of cases", "5% of cases", "10% of cases", "20% of cases", "50% of cases"],
    answer: 1
  },
  {
    id: 145, section: "Liver",
    q: "Acute hepatitis C progresses to chronic hepatitis C in:",
    options: ["20% of cases", "40% of cases", "50% of cases", "80% of cases", "100% of cases"],
    answer: 3
  },
  {
    id: 146, section: "Liver",
    q: "Drug used to treat chronic hepatitis B:",
    options: ["Fumaric acid", "Sofosbuvir", "Tenofovir", "Amoxicillin", "Corticosteroid"],
    answer: 2
  },
  {
    id: 147, section: "Liver",
    q: "About 2/3 of cases of chronic hepatitis present with:",
    options: ["Severe symptoms", "No symptoms", "Cirrhosis", "Hepatocellular carcinoma", "Jaundice"],
    answer: 1
  },
  {
    id: 148, section: "Liver",
    q: "Which test assesses functional state of the liver?",
    options: ["Alanine aminotransferase", "Gamma glutamyl transferase", "International normalized ratio (INR)", "Fecal elastase", "5' nucleotidase"],
    answer: 2
  },
  {
    id: 149, section: "Liver",
    q: "17-year-old male with malaise, anorexia, fever, nausea, jaundice, dark urine, pale stool. Most likely diagnosis:",
    options: ["Peptic ulcer disease", "Gastroenteritis", "Viral hepatitis A", "Myocarditis", "Bacterial pneumonia"],
    answer: 2
  },
  {
    id: 150, section: "Liver",
    q: "Color of urine is normal in jaundice caused by:",
    options: ["Gilbert syndrome", "Cancer head of pancreas", "Stone in common bile duct", "Acute hepatitis", "Cholestasis of pregnancy"],
    answer: 0
  },
  {
    id: 151, section: "Liver",
    q: "Normal level of bilirubin in blood is:",
    options: ["2 mg/dL", "1 mg/dL", "3 mg/dL", "4 mg/dL", "5 mg/dL"],
    answer: 1
  },
  {
    id: 152, section: "Liver",
    q: "50-year-old male with jaundice, itching, pale stool and dark urine. LFTs show elevated conjugated bilirubin and ALP. Most likely diagnosis:",
    options: ["Hemolytic anaemia", "Viral hepatitis", "Acute pancreatitis", "Obstructive jaundice", "Crigler-Najjar syndrome"],
    answer: 3
  },
  {
    id: 153, section: "Liver",
    q: "Example of transudative ascites is:",
    options: ["Malignant peritonitis", "Budd-Chiari syndrome", "Liver cirrhosis", "Chylous ascites", "Tuberculosis"],
    answer: 2
  },
  {
    id: 154, section: "Liver",
    q: "Which is NOT a complication of hepatic cirrhosis?",
    options: ["Spontaneous bacterial peritonitis", "Hepatocellular carcinoma", "Thrombocytosis", "Portal hypertension", "Portal vein thrombosis"],
    answer: 2
  },
  {
    id: 155, section: "Liver",
    q: "First-line pharmacological agent in upper GI bleeding from oesophageal varices:",
    options: ["H2 blockers", "Proton pump inhibitors", "Antacids", "Octreotide", "Antiemetics"],
    answer: 3
  },
  {
    id: 156, section: "Liver",
    q: "Portal hypertension does NOT lead to:",
    options: ["Esophageal varices", "Hemorrhoids", "Splenomegaly", "Caput medusae", "Renal calculi"],
    answer: 4
  },

  // ===== GIT =====
  {
    id: 157, section: "GIT",
    q: "The most common cause of acute pancreatitis is:",
    options: ["Gallstones", "Medications", "Trauma", "ERCP", "Hypertriglyceridemia"],
    answer: 0
  },
  {
    id: 158, section: "GIT",
    q: "Preferred therapy in mild ulcerative colitis confined to the rectum:",
    options: ["Topical mesalazine by suppository", "Oral prednisone", "Intravenous azathioprine", "Hydrocortisone by enema", "Surgery"],
    answer: 0
  },
  {
    id: 159, section: "GIT",
    q: "The typical symptoms of GERD include:",
    options: ["Regurgitation", "Cough", "Chest pain", "Wheezing", "Syncope"],
    answer: 0
  },
  {
    id: 160, section: "GIT",
    q: "One clinical manifestation of irritable bowel syndrome:",
    options: ["Altered bowel habit", "Fever", "Iron deficiency anemia", "Bloody diarrhea", "Tenesmus"],
    answer: 0
  },
  {
    id: 161, section: "GIT",
    q: "The gold standard for establishing diagnosis of GERD:",
    options: ["Endoscopy", "Barium swallow", "24-hour pH monitoring", "CT chest", "Abdominal X-ray"],
    answer: 2
  },
  {
    id: 162, section: "GIT",
    q: "Complications of GERD include which of the following?",
    options: ["Barrett's esophagus", "Esophageal perforation", "Esophageal varices", "Gastric ulceration", "Duodenal ulceration"],
    answer: 0
  },
  {
    id: 163, section: "GIT",
    q: "Most common cause of upper gastrointestinal bleeding is:",
    options: ["Erosive esophagitis", "Mallory-Weiss tear", "Vascular malformation", "Peptic ulcer disease", "Gastric carcinoma"],
    answer: 3
  },
  {
    id: 164, section: "GIT",
    q: "Which study distinguishes ulcerative colitis from infectious colitis in acute bloody diarrhea?",
    options: ["Radiography", "Stool assays", "Double-contrast barium enema", "Mucosal biopsy", "Erect abdominal X-ray"],
    answer: 3
  },
  {
    id: 165, section: "GIT",
    q: "Most common site of chronic inflammatory process in Crohn's disease:",
    options: ["Colon", "Esophagus", "Ileocecal region", "Stomach", "Oral cavity"],
    answer: 2
  },
  {
    id: 166, section: "GIT",
    q: "Common feature of Crohn's disease:",
    options: ["Bleeding per rectum", "Hepatitis", "Anal fistula", "Pneumonia", "Dry cough"],
    answer: 2
  },
  {
    id: 167, section: "GIT",
    q: "Most common cause of ulcerative colitis-related mortality:",
    options: ["Colonic adenocarcinoma", "Toxic megacolon", "Perforated colon", "Colonic infarction", "Bloody diarrhea"],
    answer: 1
  },
  {
    id: 168, section: "GIT",
    q: "The following laboratory result will be found in chronic pancreatitis with maldigestion:",
    options: ["Decreased serum trypsinogen level", "High serum lipase", "Increased fecal elastase", "Hyperglycemia", "High serum amylase"],
    answer: 0
  },
  {
    id: 169, section: "GIT",
    q: "Commonest cause of chronic pancreatitis in adulthood:",
    options: ["Cystic fibrosis", "Hereditary chronic pancreatitis", "Autoimmune pancreatitis", "Alcohol", "Congenital pancreatic anomalies"],
    answer: 3
  },
  {
    id: 170, section: "GIT",
    q: "Drug recognized as cause of pancreatitis:",
    options: ["Amiodarone", "Alendronate", "Atenolol", "Azathioprine", "Paracetamol"],
    answer: 3
  },
  {
    id: 171, section: "GIT",
    q: "Reflux esophagitis without H. pylori infection is treated by:",
    options: ["Omeprazole", "Metronidazole", "Ciprofloxacin", "Tetracycline", "Bismuth compounds"],
    answer: 0
  },
  {
    id: 172, section: "GIT",
    q: "Alarm features in irritable bowel syndrome include:",
    options: ["Age less than 30 years", "Intermittent watery diarrhea", "Regressive abdominal pain", "Family history of IBS", "Unexplained weight loss"],
    answer: 4
  },
  {
    id: 173, section: "GIT",
    q: "Abdominal pain in IBS is:",
    options: ["Radiated to the right shoulder", "Stitching pain", "Increased by bowel movement", "Relieved with defecation", "Decreases with food intake"],
    answer: 3
  },
  {
    id: 174, section: "GIT",
    q: "Which condition excludes functional GI disorders?",
    options: ["Frequent abdominal pain", "Frequent change in bowel habits", "Duration of symptoms only 3 months", "Positive fecal calprotectin", "Passage of mucus with stool"],
    answer: 3
  },
  {
    id: 175, section: "GIT",
    q: "Hallmark symptom of irritable bowel syndrome:",
    options: ["Blood in stool", "Unintentional weight loss", "Abdominal pain relieved by defecation", "Steatorrhea", "Vomiting"],
    answer: 2
  },
  {
    id: 176, section: "GIT",
    q: "Which is false about IBS abdominal pain?",
    options: ["Sleep deprivation is usual", "Exacerbated by eating", "Improved by passage of flatus or stools", "Worsens during premenstrual and menstrual phases"],
    answer: 0
  },
  {
    id: 177, section: "GIT",
    q: "Main treatment of celiac disease:",
    options: ["Carbohydrate-free diet", "Protein-free diet", "Gluten-free diet", "Antacids", "Antibiotics"],
    answer: 2
  },
  {
    id: 178, section: "GIT",
    q: "Celiac disease is NOT characterized by:",
    options: ["Steatorrhea", "Subtotal villous atrophy", "Positive tissue transglutaminase", "IgA deficiency", "Chronic constipation"],
    answer: 4
  },
  {
    id: 179, section: "GIT",
    q: "Common complication of GERD:",
    options: ["Peptic ulcer", "Crohn's disease", "Diverticulitis", "Barrett's esophagus", "Ulcerative colitis"],
    answer: 3
  },
  {
    id: 180, section: "GIT",
    q: "Malabsorption syndrome may be associated with:",
    options: ["Parkinson's disease", "Friedrich disease", "Celiac disease", "Duchenne disease", "Refsum disease"],
    answer: 2
  },
  {
    id: 181, section: "GIT",
    q: "Not a common cause for malabsorption syndrome:",
    options: ["Tropical sprue", "Chronic pancreatitis", "Subtotal villous atrophy", "Celiac disease", "Staphylococcal food poisoning"],
    answer: 4
  },
  {
    id: 182, section: "GIT",
    q: "Most common associated symptom with malabsorption syndromes:",
    options: ["Hematemesis", "Steatorrhea", "Dysphagia", "Heartburn", "Melena"],
    answer: 1
  },

  // ===== HEMATOLOGY =====
  {
    id: 183, section: "Hematology",
    q: "In treatment of megaloblastic anemia:",
    options: ["Folic acid should be given before Vit B12", "Vit B12 should be given before folic acid", "Given together", "Oral iron should be given first", "Iron chelating agents are needed"],
    answer: 1
  },
  {
    id: 184, section: "Hematology",
    q: "The hallmark of aplastic anemia:",
    options: ["Low platelets", "Low RBCs", "Low WBCs", "Pancytopenia", "Increased RBCs"],
    answer: 3
  },
  {
    id: 185, section: "Hematology",
    q: "Which is associated with splenomegaly?",
    options: ["Chronic renal failure", "Aplastic anemia", "Hereditary spherocytosis", "Sickle cell anemia (late)", "Iron deficiency anemia"],
    answer: 2
  },
  {
    id: 186, section: "Hematology",
    q: "Iron deficiency anemia may be caused by:",
    options: ["Chronic blood loss", "Folic acid deficiency", "Vit B12 deficiency", "Auto-antibodies", "Hemoglobin abnormalities"],
    answer: 0
  },
  {
    id: 187, section: "Hematology",
    q: "Red cell osmotic fragility is increased in:",
    options: ["Thalassemia major", "Hereditary spherocytosis", "Iron deficiency anemia", "HbC disease", "Megaloblastic anemia"],
    answer: 1
  },
  {
    id: 188, section: "Hematology",
    q: "Hemolytic anemia is characterized by all EXCEPT:",
    options: ["Hemolytic jaundice", "Gall stone", "Hemolytic crisis", "Normal life span of red cells", "Increased urinary urobilinogen"],
    answer: 3
  },
  {
    id: 189, section: "Hematology",
    q: "Complication of hemolytic anemia may include:",
    options: ["Gall stone", "Renal failure", "HTN", "DM", "Lymphoma"],
    answer: 0
  },
  {
    id: 190, section: "Hematology",
    q: "Coombs' test diagnoses:",
    options: ["Thalassemia", "Iron deficiency anemia", "Sickle cell anemia", "Autoimmune hemolytic anemia", "Megaloblastic anemia"],
    answer: 3
  },
  {
    id: 191, section: "Hematology",
    q: "Hodgkin disease is characterized mainly by:",
    options: ["Presence of Reed-Sternberg cells", "Lymphadenopathy", "Amalgamated lymph nodes", "Leucopenia", "Toxic manifestations"],
    answer: 0
  },
  {
    id: 192, section: "Hematology",
    q: "Definitive diagnosis of Hodgkin lymphoma is made by:",
    options: ["Complete blood count", "Blood film", "Lymph node biopsy", "Bone marrow biopsy", "ESR"],
    answer: 2
  },
  {
    id: 193, section: "Hematology",
    q: "Thrombocytopenia is NOT present in:",
    options: ["Iron deficiency", "Bone marrow failure", "Hypersplenism", "Platelet consumptive disorders (DIC)", "Autoimmune"],
    answer: 0
  },
  {
    id: 194, section: "Hematology",
    q: "A 28-year-old pregnant female with placental abruption: prolonged PT and PTT, thrombocytopenia, decreased fibrinogen. Most appropriate diagnosis:",
    options: ["DIC", "Microcytic anemia", "Megaloblastic anemia", "Acute hemolysis", "Severe bone marrow depression"],
    answer: 0
  },
  {
    id: 195, section: "Hematology",
    q: "Autoimmune hemolytic anemia is associated with:",
    options: ["Acute lymphoblastic leukemia (ALL)", "Chronic lymphocytic leukemia (CLL)", "Acute myeloid leukemia (AML)", "Chronic myeloid leukemia (CML)", "Paroxysmal nocturnal hemoglobinuria"],
    answer: 1
  },
  {
    id: 196, section: "Hematology",
    q: "aPTT will NOT be prolonged in:",
    options: ["Lupus anticoagulant", "Severe fibrinogen deficiency", "Hemophilia", "Unfractionated heparin therapy", "Thrombocytopenia"],
    answer: 4
  },
  {
    id: 197, section: "Hematology",
    q: "Which regarding CML is NOT true?",
    options: ["Associated with huge splenomegaly", "Presence of Philadelphia chromosome", "One of the myeloproliferative disorders", "May progress to blast crisis", "Most common cause of microcytic hypochromic anemia"],
    answer: 4
  },
  {
    id: 198, section: "Hematology",
    q: "Female with thrombocytopenia, anemia, leukocytosis and abnormal blast cells in blood film. Most appropriate next step:",
    options: ["Bone marrow aspirate", "Anticoagulation", "Antibiotic therapy", "Repeat CBC", "Request ESR"],
    answer: 0
  },
  {
    id: 199, section: "Hematology",
    q: "Conditions associated with microcytosis do NOT include:",
    options: ["Acute hemolysis", "Thalassemia", "Iron deficiency anemia", "Sideroblastic anemia", "Anemia of chronic disease"],
    answer: 0
  },
  {
    id: 200, section: "Hematology",
    q: "Pancytopenia is NOT associated with:",
    options: ["Aplastic anemia", "Bone marrow infiltration", "G6PD deficiency", "Hypersplenism", "Paroxysmal nocturnal hemoglobinuria"],
    answer: 2
  },
  {
    id: 201, section: "Hematology",
    q: "Reed-Sternberg cells are characteristic of:",
    options: ["Hodgkin lymphoma", "Leukemia", "Multiple myeloma", "Spherocytosis", "Sickle cell anemia"],
    answer: 0
  },
  {
    id: 202, section: "Hematology",
    q: "Macrocytic anemia is found in:",
    options: ["Pernicious anemia", "Iron deficiency anemia", "Pregnancy", "Thalassemia", "Sideroblastic anemia"],
    answer: 0
  },
  {
    id: 203, section: "Hematology",
    q: "Features of sickle cell anemia do NOT include:",
    options: ["Leg ulcers", "Hypersplenism", "Priapism", "Retinal infarction", "Nocturia"],
    answer: 4
  },
  {
    id: 204, section: "Hematology",
    q: "Which is NOT a feature of beta-thalassemia major?",
    options: ["Splenomegaly", "Iron deficiency", "Pigment gallstones", "Hemolytic jaundice", "Target cells in blood film"],
    answer: 1
  },
  {
    id: 205, section: "Hematology",
    q: "One cause of microcytic anemia NOT included:",
    options: ["Iron deficiency", "Thalassemia", "Sideroblastic anemia", "Acute hemolysis", "Anemia of chronic disease"],
    answer: 3
  },
  {
    id: 206, section: "Hematology",
    q: "Pica is a symptom of:",
    options: ["Thalassemia", "Sickle cell anemia", "Megaloblastic anemia", "Hemolytic anemia", "Iron deficiency anemia"],
    answer: 4
  },
  {
    id: 207, section: "Hematology",
    q: "Classical clinical sign of iron deficiency anemia:",
    options: ["Splenomegaly", "Jaundice", "Spoon-shaped nail (koilonychia)", "Peripheral oedema", "Dark urine"],
    answer: 2
  },
  {
    id: 208, section: "Hematology",
    q: "Hallmark laboratory finding in hemolytic anemia:",
    options: ["Low MCV", "Elevated reticulocyte count", "Low serum iron", "Decreased LDH", "Low bilirubin"],
    answer: 1
  },
  {
    id: 209, section: "Hematology",
    q: "Most common cause of iron deficiency anemia worldwide:",
    options: ["Chronic renal failure", "Hemolytic anemia", "Acute blood loss", "Chronic blood loss", "Vitamin B12 deficiency"],
    answer: 3
  },
  {
    id: 210, section: "Hematology",
    q: "Typical clinical presentation of lymphoma:",
    options: ["Painless lymphadenopathy", "Rapid onset hemiplegia", "Chronic cough", "Hematemesis", "Ecchymosis"],
    answer: 0
  },
  {
    id: 211, section: "Hematology",
    q: "Typical presentation of leukemia:",
    options: ["Hypertension and hematuria", "Abdominal pain and jaundice", "Headache and vomiting", "Bone pain, pallor and petechiae", "Cough and hemoptysis"],
    answer: 3
  },
  {
    id: 212, section: "Hematology",
    q: "Acute lymphoblastic leukemia is more common in:",
    options: ["Adults", "Children", "Old age", "Middle age", "Females"],
    answer: 1
  },
  {
    id: 213, section: "Hematology",
    q: "Which causes microcytic anemia?",
    options: ["Aplastic anemia", "Vitamin B12 deficiency", "Folic acid deficiency", "Hemolytic anemia", "Sideroblastic anemia"],
    answer: 4
  },

  // ===== NEUROLOGY =====
  {
    id: 214, section: "Neuro",
    q: "The surest sign of upper motor neurone (pyramidal) lesion:",
    options: ["Unsteadiness", "Organic clonus", "Facial pain", "Hemihypoesthesia", "Fits"],
    answer: 1
  },
  {
    id: 215, section: "Neuro",
    q: "NOT present in upper motor neurone lesion:",
    options: ["Clasp-knife spasticity", "Extensor plantar response", "Organic clonus", "Pathological reflexes", "Marked wasting and fasciculation"],
    answer: 4
  },
  {
    id: 216, section: "Neuro",
    q: "Pyramidal tract lesion may be associated with all EXCEPT:",
    options: ["Ankle clonus", "Babinski sign", "Clasp-knife spasticity", "Cogwheel rigidity"],
    answer: 3
  },
  {
    id: 217, section: "Neuro",
    q: "Which is NOT a feature of upper motor neurone lesions?",
    options: ["Spasticity", "Clonus", "Babinski sign", "Fasciculation"],
    answer: 3
  },
  {
    id: 218, section: "Neuro",
    q: "Hypotonia is caused by all EXCEPT:",
    options: ["Upper motor neurone lesions", "Lower motor neurone lesions", "Rheumatic chorea", "Parkinsonism"],
    answer: 0
  },
  {
    id: 219, section: "Neuro",
    q: "Brown-Séquard syndrome is characterized by:",
    options: ["Contralateral deep sensory loss", "Ipsilateral superficial sensory loss", "Ipsilateral hemiplegia", "Contralateral hemiplegia"],
    answer: 2
  },
  {
    id: 220, section: "Neuro",
    q: "Crossed hemiplegia indicates site of lesion in:",
    options: ["Internal capsule", "Cortex", "Brain stem", "Cervical spine", "Cerebellum"],
    answer: 2
  },
  {
    id: 221, section: "Neuro",
    q: "Weber's syndrome involves crossed hemiplegia with:",
    options: ["Facial nerve", "Abducent nerve", "Oculomotor nerve", "Vagus nerve"],
    answer: 2
  },
  {
    id: 222, section: "Neuro",
    q: "Causes of transient hemiplegia include:",
    options: ["Motor neurone disease", "Subacute combined degeneration", "Todd's paralysis", "Embolic hemiplegia", "Thrombotic hemiplegia"],
    answer: 2
  },
  {
    id: 223, section: "Neuro",
    q: "A patient with hemiplegia of sudden onset. Most probable aetiology:",
    options: ["Embolic", "Neoplastic", "Haemorrhagic", "Thrombotic", "Degenerative"],
    answer: 0
  },
  {
    id: 224, section: "Neuro",
    q: "Epilepsy means:",
    options: ["One attack of convulsion", "Recurrent attacks of convulsions", "No attack of convulsions", "Hysterical convulsions", "Severe weakness"],
    answer: 1
  },
  {
    id: 225, section: "Neuro",
    q: "After post-ictal stage, prolonged sleep and paralysis due to neuronal exhaustion is:",
    options: ["Todd's paralysis", "Hypoglycaemia", "Migraine", "Hemiplegia"],
    answer: 0
  },
  {
    id: 226, section: "Neuro",
    q: "Drug used in treatment of status epilepticus:",
    options: ["Loading dose of Phenytoin (20 mg/kg)", "NSAIDs", "Vitamin B complex", "L-Dopa", "Anti-thyroid drugs"],
    answer: 0
  },
  {
    id: 227, section: "Neuro",
    q: "Which anticonvulsant has gum hyperplasia as a side effect?",
    options: ["Phenytoin (Epanutin)", "Diazepam", "Carbamazepine", "Valproate (Depakine)", "Clonazepam"],
    answer: 0
  },
  {
    id: 228, section: "Neuro",
    q: "Signs of cerebellar ataxia do NOT include:",
    options: ["Staccato speech", "Staggering gait", "Nystagmus", "Dysdiadochokinesia", "Extensor plantar response"],
    answer: 4
  },
  {
    id: 229, section: "Neuro",
    q: "Male patient with Archicerebellar affection, UMN lesion, peripheral neuropathy and positive family history. Most probable diagnosis:",
    options: ["Friedrich's ataxia", "Bell's palsy", "Huntington's chorea", "Cerebral palsy", "Hemiplegia"],
    answer: 0
  },
  {
    id: 230, section: "Neuro",
    q: "Which is involved earliest in diphtheritic neuropathy?",
    options: ["Loss of accommodation", "Polyneuropathy", "Paralysis of soft palate", "Abducent palsy"],
    answer: 2
  },
  {
    id: 231, section: "Neuro",
    q: "Management of choice in Guillain-Barré syndrome:",
    options: ["Immunoglobulin", "Cyclophosphamide", "Corticosteroid", "Interferon"],
    answer: 0
  },
  {
    id: 232, section: "Neuro",
    q: "All produce mononeuritis multiplex EXCEPT:",
    options: ["Polyarteritis nodosa", "Sarcoidosis", "Rheumatoid arthritis", "Infectious mononucleosis"],
    answer: 3
  },
  {
    id: 233, section: "Neuro",
    q: "Guillain-Barré Syndrome — all true EXCEPT:",
    options: ["Inflammatory", "Demyelinating", "Descending", "Cranial nerve involvement"],
    answer: 2
  },
  {
    id: 234, section: "Neuro",
    q: "All can occur in Motor Neuron Disease EXCEPT:",
    options: ["Lateral sclerosis", "Pseudobulbar palsy", "Progressive muscular atrophy", "Peripheral neuropathy"],
    answer: 3
  },
  {
    id: 235, section: "Neuro",
    q: "Myasthenia gravis can be treated by all EXCEPT:",
    options: ["Corticosteroids", "Thymectomy", "Atropine", "Prostigmine"],
    answer: 2
  },
  {
    id: 236, section: "Neuro",
    q: "18-year-old female with acute fever, headache, neck stiffness. LP: increased tension, turbidity, many leucocytes, Gram-negative diplococci. Diagnosis:",
    options: ["Meningococcal meningitis", "Multiple sclerosis", "Viral encephalitis", "Increased intracranial tension", "Seizures"],
    answer: 0
  },
  {
    id: 237, section: "Neuro",
    q: "Stroke is defined by acute onset of:",
    options: ["Focal neurological deficit caused by thrombotic or hemorrhagic lesion", "Focal neurological deficit caused by demyelinating lesion", "Focal neurological deficit caused by degenerative lesion", "Focal neurological deficit caused by inflammatory lesion", "Focal neurological deficit caused by neoplastic lesion"],
    answer: 0
  },
  {
    id: 238, section: "Neuro",
    q: "Which may distinguish pulmonary vs cardiac etiology of dyspnea?",
    options: ["Significantly elevated serum BNP", "Audible rhonchi", "Chest crackles", "Cough and hemoptysis", "Rapid onset of dyspnea"],
    answer: 0
  },
  {
    id: 239, section: "Neuro",
    q: "Tone of muscles in gradually progressive UMN lesion would be:",
    options: ["Normal", "Spastic", "Rigid", "Mildly flaccid", "Severely flaccid"],
    answer: 1
  },
  {
    id: 240, section: "Neuro",
    q: "Diabetic autonomic peripheral neuropathy characterized by all EXCEPT:",
    options: ["Postural hypotension", "Quadriceps wasting", "Impotence", "Gastroparesis"],
    answer: 1
  },
  {
    id: 241, section: "Neuro",
    q: "Which is false regarding diabetic polyneuropathy?",
    options: ["Mostly motor neuropathy", "Characterized by symmetric polyneuropathy", "Vitamin B complex usually given", "Manifested initially by paresthesia", "Contributes to diabetic foot"],
    answer: 0
  },
];

const SECTIONS = ["All", "Cardio", "Chest", "Liver", "GIT", "Hematology", "Neuro"];

const SECTION_COLORS = {
  Cardio: { bg: "#fce4ec", text: "#c62828", dot: "#e91e63" },
  Chest: { bg: "#e8f5e9", text: "#1b5e20", dot: "#4caf50" },
  Liver: { bg: "#e3f2fd", text: "#0d47a1", dot: "#2196f3" },
  GIT: { bg: "#fffde7", text: "#f57f17", dot: "#ffc107" },
  Hematology: { bg: "#f3e5f5", text: "#4a148c", dot: "#9c27b0" },
  Neuro: { bg: "#fff3e0", text: "#e65100", dot: "#ff9800" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [screen, setScreen] = useState("setup"); // setup | quiz | result | study
  const [selectedSections, setSelectedSections] = useState(["All"]);
  const [shuffleQ, setShuffleQ] = useState(false);
  const [shuffleA, setShuffleA] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [mode, setMode] = useState("quiz"); // quiz | study

  const [questions, setQuestions] = useState([]);
  const [optionMaps, setOptionMaps] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [important, setImportant] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [qTime, setQTime] = useState(0);
  const timerRef = useRef(null);
  const qTimerRef = useRef(null);

  const filteredBase = selectedSections.includes("All")
    ? ALL_QUESTIONS
    : ALL_QUESTIONS.filter(q => selectedSections.includes(q.section));

  useEffect(() => {
    if (screen === "quiz" || screen === "study") {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen]);

  useEffect(() => {
    if (screen === "quiz") {
      setQTime(0);
      qTimerRef.current = setInterval(() => setQTime(t => t + 1), 1000);
    }
    return () => clearInterval(qTimerRef.current);
  }, [current, screen]);

  function fmt(s) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  function startSession(m) {
    setMode(m);
    let qs = [...filteredBase];
    if (shuffleQ) qs = shuffle(qs);
    const maps = qs.map(q => {
      const indices = q.options.map((_, i) => i);
      if (shuffleA) {
        const shuffled = shuffle(indices);
        return shuffled;
      }
      return indices;
    });
    setQuestions(qs);
    setOptionMaps(maps);
    setCurrent(0);
    setSelected(null);
    setAnswers(new Array(qs.length).fill(null));
    setSkipped(new Array(qs.length).fill(false));
    setElapsed(0);
    setQTime(0);
    setStartTime(Date.now());
    setScreen(m);
  }

  function handleSelect(optIdx) {
    if (selected !== null) return;
    setSelected(optIdx);
    const q = questions[current];
    const map = optionMaps[current];
    const isCorrect = map[optIdx] === q.answer;
    const newAnswers = [...answers];
    newAnswers[current] = { chosen: optIdx, correct: isCorrect };
    setAnswers(newAnswers);
    if (autoNext && isCorrect) {
      setTimeout(() => goNext(), 800);
    }
  }

  function goNext() {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setQTime(0);
    } else {
      clearInterval(timerRef.current);
      setScreen("result");
    }
  }

  function goPrev() {
    if (current > 0) {
      setCurrent(c => c - 1);
      setSelected(answers[current - 1]?.chosen ?? null);
    }
  }

  function skip() {
    const ns = [...skipped];
    ns[current] = true;
    setSkipped(ns);
    goNext();
  }

  function toggleImportant(id, level) {
    setImportant(prev => {
      const cur = prev[id];
      if (cur === level) return { ...prev, [id]: null };
      return { ...prev, [id]: level };
    });
  }

  function toggleSection(s) {
    if (s === "All") {
      setSelectedSections(["All"]);
      return;
    }
    let ns = selectedSections.filter(x => x !== "All");
    if (ns.includes(s)) {
      ns = ns.filter(x => x !== s);
    } else {
      ns = [...ns, s];
    }
    if (ns.length === 0) ns = ["All"];
    setSelectedSections(ns);
  }

  const correctCount = answers.filter(a => a?.correct).length;
  const wrongCount = answers.filter(a => a && !a.correct).length;
  const skippedCount = skipped.filter(Boolean).length;

  // ===== SETUP SCREEN =====
  if (screen === "setup") {
    return (
      <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e8eaf6", fontFamily: "system-ui, sans-serif", padding: "20px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🩺</div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#7986cb", margin: 0 }}>Internal Medicine MCQ Bank</h1>
            <p style={{ color: "#90a4ae", marginTop: 6, fontSize: 14 }}>{ALL_QUESTIONS.length} unique questions • Al-Azhar University</p>
          </div>

          {/* Sections */}
          <div style={{ background: "#1a1d2e", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 14, color: "#b0bec5", fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>📋 Sections</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SECTIONS.map(s => {
                const active = selectedSections.includes(s);
                const col = SECTION_COLORS[s] || { bg: "#263238", text: "#90a4ae", dot: "#78909c" };
                const count = s === "All" ? ALL_QUESTIONS.length : ALL_QUESTIONS.filter(q => q.section === s).length;
                return (
                  <button key={s} onClick={() => toggleSection(s)}
                    style={{
                      padding: "8px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                      background: active ? col.dot : "#263238",
                      color: active ? "#fff" : "#90a4ae",
                      transition: "all 0.2s"
                    }}>
                    {s === "All" ? "🏥 All" : s} <span style={{ opacity: 0.7, fontSize: 11 }}>({count})</span>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#546e7a" }}>
              Selected: {filteredBase.length} questions
            </div>
          </div>

          {/* Options */}
          <div style={{ background: "#1a1d2e", borderRadius: 14, padding: 20, marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 14, color: "#b0bec5", fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>⚙️ Options</div>
            {[
              { label: "🔀 Shuffle Questions", val: shuffleQ, set: setShuffleQ },
              { label: "🔤 Shuffle Answers", val: shuffleA, set: setShuffleA },
              { label: "⚡ Auto-advance on correct", val: autoNext, set: setAutoNext },
            ].map(({ label, val, set }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ color: "#b0bec5", fontSize: 14 }}>{label}</span>
                <div onClick={() => set(!val)} style={{
                  width: 44, height: 24, borderRadius: 12, cursor: "pointer",
                  background: val ? "#7986cb" : "#37474f", position: "relative", transition: "background 0.2s"
                }}>
                  <div style={{
                    position: "absolute", top: 2, left: val ? 22 : 2, width: 20, height: 20,
                    borderRadius: "50%", background: "#fff", transition: "left 0.2s"
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => startSession("quiz")} style={{
              flex: 1, padding: "16px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #3949ab, #7986cb)", color: "#fff", fontSize: 16, fontWeight: 700
            }}>🚀 Quiz Mode</button>
            <button onClick={() => startSession("study")} style={{
              flex: 1, padding: "16px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #1b5e20, #43a047)", color: "#fff", fontSize: 16, fontWeight: 700
            }}>📖 Study Mode</button>
          </div>
        </div>
      </div>
    );
  }

  // ===== RESULT SCREEN =====
  if (screen === "result") {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e8eaf6", fontFamily: "system-ui, sans-serif", padding: "20px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 56 }}>{pct >= 70 ? "🏆" : pct >= 50 ? "📈" : "📚"}</div>
            <h2 style={{ color: "#7986cb", margin: "8px 0" }}>Result Summary</h2>
            <div style={{ fontSize: 48, fontWeight: 800, color: pct >= 70 ? "#66bb6a" : pct >= 50 ? "#ffa726" : "#ef5350" }}>{pct}%</div>
            <div style={{ color: "#90a4ae", fontSize: 13 }}>Time: {fmt(elapsed)}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "✅ Correct", val: correctCount, c: "#66bb6a" },
              { label: "❌ Wrong", val: wrongCount, c: "#ef5350" },
              { label: "⏭️ Skipped", val: skippedCount, c: "#ffa726" },
            ].map(({ label, val, c }) => (
              <div key={label} style={{ background: "#1a1d2e", borderRadius: 12, padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: c }}>{val}</div>
                <div style={{ fontSize: 12, color: "#78909c" }}>{label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setScreen("setup")} style={{
            width: "100%", padding: "14px", borderRadius: 12, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #3949ab, #7986cb)", color: "#fff", fontSize: 15, fontWeight: 700
          }}>🏠 Back to Setup</button>
        </div>
      </div>
    );
  }

  // ===== QUIZ / STUDY SCREEN =====
  const q = questions[current];
  const map = optionMaps[current];
  const sCol = SECTION_COLORS[q?.section] || { bg: "#263238", text: "#90a4ae", dot: "#78909c" };
  const imp = important[q?.id];

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e8eaf6", fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <button onClick={() => setScreen("setup")} style={{ background: "#1a1d2e", border: "none", color: "#90a4ae", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>← Back</button>
          <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#78909c" }}>
            <span>⏱️ {fmt(elapsed)}</span>
            <span>{current + 1} / {questions.length}</span>
            {mode === "quiz" && <span>Q: {fmt(qTime)}</span>}
          </div>
        </div>

        {/* Progress */}
        <div style={{ height: 4, background: "#1a1d2e", borderRadius: 4, marginBottom: 18, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "#7986cb", width: `${((current + 1) / questions.length) * 100}%`, transition: "width 0.3s" }} />
        </div>

        {/* Section badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ background: sCol.dot, color: "#fff", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{q.section}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => toggleImportant(q.id, "very")} style={{
              background: imp === "very" ? "#f57f17" : "#1a1d2e", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 13, color: imp === "very" ? "#fff" : "#78909c"
            }}>🔥</button>
            <button onClick={() => toggleImportant(q.id, "important")} style={{
              background: imp === "important" ? "#f9a825" : "#1a1d2e", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 13, color: imp === "important" ? "#fff" : "#78909c"
            }}>⭐</button>
          </div>
        </div>

        {/* Question */}
        <div style={{ background: "#1a1d2e", borderRadius: 16, padding: "20px", marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#546e7a", marginBottom: 8 }}>Q{current + 1}</div>
          <div style={{ fontSize: 17, lineHeight: 1.6, color: "#e8eaf6", fontWeight: 500 }}>{q.q}</div>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {map.map((origIdx, dispIdx) => {
            const optText = q.options[origIdx];
            const isCorrect = origIdx === q.answer;
            let bg = "#1a1d2e", border = "1px solid #263238", col = "#cfd8dc";

            if (selected !== null) {
              if (dispIdx === selected && isCorrect) { bg = "#1b5e20"; border = "1px solid #66bb6a"; col = "#fff"; }
              else if (dispIdx === selected && !isCorrect) { bg = "#b71c1c"; border = "1px solid #ef5350"; col = "#fff"; }
              else if (isCorrect) { bg = "#1b5e20"; border = "1px solid #66bb6a"; col = "#fff"; }
            }

            if (mode === "study") {
              if (isCorrect) { bg = "#1b5e20"; border = "1px solid #66bb6a"; col = "#fff"; }
            }

            return (
              <button key={dispIdx} onClick={() => mode === "quiz" && handleSelect(dispIdx)}
                style={{
                  background: bg, border, borderRadius: 12, padding: "14px 16px", cursor: mode === "quiz" ? "pointer" : "default",
                  color: col, textAlign: "left", fontSize: 15, lineHeight: 1.5, transition: "all 0.2s", fontFamily: "inherit"
                }}>
                <span style={{ background: "#263238", borderRadius: 6, padding: "2px 8px", marginRight: 10, fontSize: 12, color: "#78909c" }}>
                  {String.fromCharCode(65 + dispIdx)}
                </span>
                {optText}
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 10 }}>
          {current > 0 && (
            <button onClick={goPrev} style={{ flex: 1, padding: "13px", borderRadius: 12, border: "none", cursor: "pointer", background: "#1a1d2e", color: "#90a4ae", fontSize: 14, fontWeight: 600 }}>← Prev</button>
          )}
          {mode === "quiz" && selected === null && (
            <button onClick={skip} style={{ flex: 1, padding: "13px", borderRadius: 12, border: "none", cursor: "pointer", background: "#263238", color: "#78909c", fontSize: 14, fontWeight: 600 }}>Skip ⏭️</button>
          )}
          <button onClick={goNext} style={{
            flex: 2, padding: "13px", borderRadius: 12, border: "none", cursor: "pointer",
            background: current === questions.length - 1 ? "linear-gradient(135deg, #b71c1c, #ef5350)" : "linear-gradient(135deg, #3949ab, #7986cb)",
            color: "#fff", fontSize: 14, fontWeight: 700
          }}>
            {current === questions.length - 1 ? "Finish 🏁" : "Next →"}
          </button>
        </div>

        {/* Stats bar */}
        {mode === "quiz" && (
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16, fontSize: 13, color: "#546e7a" }}>
            <span>✅ {correctCount}</span>
            <span>❌ {wrongCount}</span>
            <span>⏭️ {skippedCount}</span>
            <span>📝 {questions.length - current - 1} left</span>
          </div>
        )}
      </div>
    </div>
  );
}
