with open('E:\\Mira\\fezasavas\\js\\main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find FR about.hero.title
search = "'about.hero.title': 'Qui est"
idx = content.find(search)
print("FR about.hero.title idx:", idx)
if idx >= 0:
    print(repr(content[idx-300:idx+50]))

# Insert FR index.projects.kabak before it
old = content[idx-100:idx+50]
print('OLD CONTEXT:')
print(repr(old))
