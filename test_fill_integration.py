import re
import os

print("=== TESTING INTEGRATION: Pattern Matching with Real Form Content ===\n")

# Simulate form data that would come from the wizard
formData = {
    'clientName': 'John Smith',
    'clientAddress': '123 Main Street, Singapore 123456',
    'clientNRIC': 'S1234567A',
    'clientEmail': 'john@example.com',
    'clientContact': '98765432',
    'clientOccupation': 'Software Engineer',
    'clientNationality': 'Singaporean',
    'agentName': 'William Ng',
    'entityName': 'ABC Properties Pte Ltd'
}

# Test with Form A1 (go up one directory to find unpacked forms)
xml_path = '../form_a1_unpacked/word/document.xml'
with open(xml_path, 'r', encoding='utf-8') as f:
    xml = f.read()

# Extract flat text (same as code does)
text_parts = []
regex = r'<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>'
for m in re.finditer(regex, xml):
    text_parts.append(m.group(1))

flatText = ''.join(text_parts)
original_text = flatText

# Define the FIXED patterns
patterns = [
    ('Full Name', r'Full Name:\s*(_{3,})', formData['clientName']),
    ('Client Name', r'Client Name:\s*(_{3,})', formData['clientName']),
    ('Entity Name', r'Entity Name:\s*(_{3,})', formData['entityName']),
    ('Estate Agent Name', r'Estate Agent Name:\s*(_{3,})', formData['agentName']),
    ('RES Name', r'RES Name:\s*(_{3,})', formData['agentName']),
    ('Company', r'Company:\s*(_{3,})', formData['entityName']),
    ('Name', r'Name:\s*(_{3,})', formData['clientName']),
]

print("Testing Form A1 with fixed patterns:\n")

replacements_made = 0
for pattern_name, pattern_str, value in patterns:
    # Count matches
    matches = len(re.findall(pattern_str, flatText))
    
    if matches > 0:
        # Apply replacement
        flatText = re.sub(pattern_str, f'{value}', flatText)
        print(f"✓ {pattern_name:20} - Applied {matches} replacement(s)")
        replacements_made += matches
    
print(f"\nTotal replacements made: {replacements_made}")
print(f"Original text length: {len(original_text)}")
print(f"Modified text length: {len(flatText)}")

# Verify some replacements happened
if 'John Smith' in flatText:
    print("\n✓ SUCCESS: Client name 'John Smith' found in modified text")
    # Show context
    idx = flatText.find('John Smith')
    context_start = max(0, idx - 30)
    context_end = min(len(flatText), idx + 50)
    print(f"  Context: ...{flatText[context_start:context_end]}...")
else:
    print("\n✗ FAILED: Client name not found in modified text")

# Check that underscores were replaced
original_underscore_count = original_text.count('___')
new_underscore_count = flatText.count('___')
print(f"\nUnderscore counts:")
print(f"  Original: {original_underscore_count}")
print(f"  After replacement: {new_underscore_count}")
print(f"  Underscores replaced: {original_underscore_count - new_underscore_count}")

if replacements_made > 0 and original_underscore_count > new_underscore_count:
    print("\n🎉 INTEGRATION TEST PASSED: Patterns match and replacements work!")
else:
    print("\n❌ INTEGRATION TEST FAILED: No replacements were made")
