import os
import re
import unicodedata

base_path = r"c:\Users\TTM\Desktop\PROJET_APP\05_PRODUCTION_CONTENUS\CATALOGUE_CONTENU"

phase_test_sessions = [
    "Galop juste et départs précis",
    "Variations d'amplitude au trot",
    "Cessions à la jambe - Pas et trot",
    "Gymnastique au sol",
    "Longe avec transitions",
    "Séance plaisir sans objectif",
    "Stretching monté - Extension d'encolure",
    "Ligne d'obstacles simples",
    "Ligne courbe sur obstacles",
    "Sauts de puces et rebonds",
    "Condition physique et souffle",
    "Correction de l'asymétrie",
    "Engagement des postérieurs",
    "Mobilité et souplesse en selle",
    "Exercices sans étriers",
    "Tête en l'air/nuque raide",
    "Cheval précipité/speed"
]

def normalize(s):
    s = unicodedata.normalize('NFD', s)
    s = s.encode('ascii', 'ignore').decode('utf-8')
    return s.lower()

def safe_name(name):
    # Match the safe_name logic from migrate_content
    name = re.sub(r'[<>:"/\\|?*]', '_', name)
    return name.strip().replace(" ", "_").replace("'", "_")

def audit_phase_test():
    results = []
    
    # Pre-calculate normalized safe names for searching
    safe_targets = [normalize(safe_name(t)) for t in phase_test_sessions]
    
    # Walk through CATALOGUE_CONTENU
    found_folders = {}
    for root, dirs, files in os.walk(base_path):
        folder_name = os.path.basename(root)
        norm_folder = normalize(folder_name)
        
        for idx, target_norm in enumerate(safe_targets):
            if target_norm == norm_folder:
                found_folders[phase_test_sessions[idx]] = root

    for session_name in phase_test_sessions:
        folder = found_folders.get(session_name)
        status = {
            "session": session_name,
            "folder": folder,
            "script": "❌",
            "fiche": "❌",
            "audio": "❌",
            "notebook": "❌",
            "path": ""
        }
        
        if folder:
            status["path"] = os.path.relpath(folder, base_path)
            files = os.listdir(folder)
            
            # Check script
            if "script.txt" in files:
                script_path = os.path.join(folder, "script.txt")
                with open(script_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if "TO_DO" in content or "Rédiger" in content or len(content) < 100:
                        status["script"] = "📝 (À rédiger)"
                    else:
                        status["script"] = "✅"
            
            # Check fiche
            if "fiche.md" in files:
                status["fiche"] = "✅"
                
            # Check audio
            audio_files = [f for f in files if f.startswith("audio")]
            if audio_files:
                status["audio"] = "✅"
                
            # Check notebook
            if "notebook.md" in files:
                status["notebook"] = "✅"
            else:
                status["notebook"] = "❌"
            
        results.append(status)

    # Output results in a table to a file
    report_path = os.path.join(os.path.dirname(base_path), "phase_test_inventory.md")
    with open(report_path, "w", encoding="utf-8") as rep:
        rep.write("# 📑 Inventaire Phase Test (17 Séances)\n\n")
        rep.write("Ce rapport détaille la disponibilité des 4 fichiers requis pour chaque séance de test.\n\n")
        rep.write("| Séance | Script | Fiche | Audio | Notebook |\n")
        rep.write("| :--- | :--- | :--- | :--- | :--- |\n")
        for r in results:
            rep.write(f"| {r['session']} | {r['script']} | {r['fiche']} | {r['audio']} | {r['notebook']} |\n")
    
    print(f"Rapport enregistré dans {report_path}")

if __name__ == "__main__":
    audit_phase_test()
