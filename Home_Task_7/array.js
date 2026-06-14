// @ts-check

const array = [4, 4, 8, 3, 3, 3, 2, 4, 4];

console.log ('Print each element of the array:');
for (let i=0; i < array.length; i++) {
console.log (array[i]);
}

console.log ('Print first threee element of the array V1:');
for (let i=0; i < 3; i++) {
    console.log (array[i]);
}

console.log ('Print first threee element of the array V2:')
let firstThree = array.slice(0, 3);
console.log (firstThree);

console.log ('Print the sum of all elements of the array V1:');
let total = 0; // Створюємо змінну для накопичення суми
for (let i = 0; i < array.length; i++) {
    total += array[i]; // Беремо елемент за його індексом i та додаємо до суми
}
console.log(total);

console.log ('Print the sum of all elements of the array V2:');
let total2 = 0; 

for (const num of array) {
    total2 += num; 
}
console.log(total2);

console.log('Print sum of all elements except the element that = 4:');
let total_sum = 0; 
for (let i = 0; i < array.length; i++) {
    if (array[i] !==4) {
            total_sum += array[i]; 
    }
}
console.log(total_sum); 

/////////

const fs =  require ('fs');

let file = fs.readFileSync('list.json', 'utf-8');
let data = JSON.parse(file);

console.log('Print Lists ID and Lists Name');

for (let i = 0; i < data.lists.length; i++) {
    console.log(`ID: ${data.lists[i].id}    NAME: ${data.lists[i].name}`)
}

