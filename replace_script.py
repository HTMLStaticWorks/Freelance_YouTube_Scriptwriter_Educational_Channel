import os
import re

directory = r"e:\OfficeDownloads_\AprilWebsites\Freelance_YouTube_Scriptwriter_Educational_Channel"

replacements = [
    # Singular addressing (Group meaning to individual meaning)
    (r"\bWe\b", "I"),
    (r"\bwe\b", "I"),
    (r"\bOur\b", "My"),
    (r"\bour\b", "my"),
    (r"\bus\b(?!\w)", "me"), # Avoid breaking words like 'user'
    (r"\bUs\b", "Me"),
    (r"\bagency\b", "freelance strategist"),
    (r"\bAgency\b", "Freelance Strategist"),
    (r"\bteam\b", "solo creator"),
    (r"\bTeam\b", "Solo Creator"),

    # YouTube Scriptwriter -> Brand Naming Strategist
    (r"YouTube Educational Scriptwriter", "Brand Naming & Tagline Strategist"),
    (r"educational YouTube channels", "ambitious startups and brands"),
    (r"YouTube channels", "brands"),
    (r"educational creators", "ambitious companies"),
    (r"scriptwriting", "brand naming"),
    (r"Scriptwriting", "Brand Naming"),
    (r"scriptwriter", "naming strategist"),
    (r"Scriptwriter", "Naming Strategist"),
    (r"\bscripts\b", "brand identities"),
    (r"\bScripts\b", "Brand Identities"),
    (r"\bscript\b", "brand name"),
    (r"\bScript\b", "Brand Name"),
    (r"audience retention", "brand recognition"),
    (r"viral hooks", "unforgettable names"),
    (r"documentary-style storytelling", "strategic market positioning"),
    (r"Documentary Scripts", "Naming Projects"),
    (r"Creator Economy", "Brand Identity"),
    (r"Retention Rate", "Brand Recall Rate"),
    (r"YouTube Analytics", "Consumer Testing"),
    (r"VIRAL HOOKS", "UNFORGETTABLE NAMES"),
    (r"Curiosity-driven openings that stop the scroll", "Evocative names that capture attention instantly"),
    (r"Scripts Delivered", "Brands Named"),
    (r"Total Views", "Markets Reached"),
    (r"Hours Written", "Ideas Generated"),
    (r"build your channel", "build your brand"),
    (r"VERTICAL EXPERTISE", "INDUSTRY EXPERTISE"),
    (r"educational niches", "market sectors"),
    
    # Specific hero/headline phrases from the index template
    (r"I WRITE <br><span class=\"text-outline\">RETENTION</span>", "I CRAFT <br><span class=\"text-outline\">IDENTITIES</span>"),
    (r"engineer watch-time to keep your audience hooked", "engineer brand identities that stick in your audience's mind"),
    (r"PACING <br>ARCHITECTURE", "NAMING <br>ARCHITECTURE"),
    (r"I map every second to a psychological trigger", "I map every word to a psychological trigger"),
    (r"THE STRATEGIST <br><span class=\"text-outline\">BEHIND THE SCRIPTS</span>", "THE STRATEGIST <br><span class=\"text-outline\">BEHIND THE NAMES</span>"),
    (r"addictive narratives", "unforgettable identities"),
    (r"documentary storytelling and behavioral psychology", "linguistics and consumer psychology"),
    (r"what makes viewers stay", "what makes a brand endure"),
    (r"your voice, your audience", "your vision, your market"),
    (r"Custom narrative architecture for your niche", "Bespoke semantic exploration tailored to your niche"),
    (r"Academic-grade research for every claim", "Preliminary trademark and domain availability screening"),
    (r"classic documentary filmmaking", "classical linguistics"),
    (r"Malcolm Gladwell's pacing", "modern pop culture"),
    (r"suspense-building techniques of modern thrillers", "subtle art of poetry"),
    (r"educational content doesn't feel like a lesson\. It feels like an unraveling mystery", "brand name doesn't just describe what you do; it dictates how people feel"),
    (r"Deep dive into your style and niche", "Deep dive into your brand's DNA"),
    (r"Structuring the narrative architecture", "Brainstorming across varied directions"),
    (r"Collaborative refinement and editing", "Collaborative feedback and editing"),
    (r"Perfecting the pacing and hooks", "The name, tagline, and rationale"),
    
    # Fixing some specific timeline replacements
    (r"00:00 - 00:15 \| THE HOOK", "01 | THE DISCOVERY"),
    (r"00:15 - 01:30 \| THE STAKES", "02 | SEMANTIC EXPLORATION"),
    (r"01:30 - 05:00 \| THE JOURNEY", "03 | REFINEMENT & FILTERING"),
    (r"05:00 - END \| THE PAYOFF", "04 | THE PAYOFF"),
    (r"Visual curiosity \+ high-stakes problem setup\. Force the \"open loop\" in the viewer's mind\.", "I dive deep into your brand's soul, target audience, and core values to uncover the hidden narrative."),
    (r"Establish why this matters\. Connect the topic to the viewer's world\.", "Mapping out linguistic territories, exploring metaphors, roots, and sound symbolism."),
    (r"Rapid-fire information delivery with storytelling pivot points every 45 seconds\.", "Narrowing down to the absolute best fits, ensuring memorability, pronunciation ease, and emotional resonance."),
    (r"Synthesize the value and transition into the next video loop\.", "Delivering a curated presentation of trademark-ready names paired with taglines."),
]

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        original_content = content
        
        for old_pattern, new_pattern in replacements:
            content = re.sub(old_pattern, new_pattern, content)
            
        # Specific fixes from previous script
        content = content.replace("Ibsite", "website")
        content = content.replace("Iek", "week")
        
        if content != original_content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated {filename}")

print("Done replacing.")
