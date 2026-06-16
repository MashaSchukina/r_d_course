import json

array = [4, 4, 8, 3, 3, 3, 2, 4, 4]

print ('Print array:')
print(array)

print ('Print each element of array:')
for i in array:
    print(i)

print ('Print first three element of array:')
for i in range(3):
    print (array[i])

print ('Print sum each element of array V1:')
total = sum(array)
print (total)

print ('Print sum each element of array V2:')
total = 0
for i in array:
    total += i
print (total)

print ('Print sum each element of array without 4:')
total = 0
for i in array:
    if i !=4:
        total += i
print (total)

print ('Print sum each element of array without 4 V2:')
total = sum(i for i in array if i != 4)
print(total)

print ('Print ID and name from lists:')
with open ('list.json', 'r') as list:
    data = json.load(list)
    for item in data["lists"]:
        print(f"ID: {item['id']}  Name: {item['name']}")
