class HashMap {
  constructor() {
    this.capacity = 16;
    this.buckets = [];
    this.size = 0;
    this.loadfactor = 0.74;

    // Bucket Implementation
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }
  restriction(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }
  set(key, value) {
    const hash = this.hash(key);
    const index = hash % this.capacity;

    const currentLoad = this.size / this.capacity;

    this.restriction(index);

    if (currentLoad > this.loadfactor) {
      console.log(`currentLoad Vale: ${currentLoad} and loadFactor Value: ${this.loadfactor}`);
      this.resize();
    }

    this.insert(index, key, value);

    this.size++;
  }
  insert(index, key, value) {
    if (this.buckets[index].length === 0) {
      // PROBLEM: asta
      // PSEUDOCODE: FOR KEY DUPLICATION OVERRIDE
      //1.  CHECK IF KEY IS ALREADY EXSIST
      //  1.1 How to Check?
      //  1.a loop through the buckets if the key is exist
      //2. OVERIDE THE VALUE
      let current = this.buckets[index];

      this.buckets[index] = new Node(key, value);
    } else {
      let current = this.buckets[index];

      while (current.next !== null) {
        current = current.next;
      }
      if (current.key === key) {
        // duplicate checker
        current.value = value;
        return;
      }
      console.log("Current Value");
      console.log(current);

      current.next = new Node(key, value);
    }
  }

  print() {
    const currentLoad = this.size / this.capacity;
    // console.log(this.buckets);
    console.log(this.loadfactor);
    console.log(this.size);
    console.log(currentLoad);
    // console.log(this.resize());
    console.log(this.buckets);
    this.bucketCounter();
  }
  resize() {
    console.log("Resizing Start");
    const oldbuckets = this.buckets;
    this.capacity = this.capacity * 2;

    const flat = oldbuckets.flat();

    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }

    this.size = 0;

    for (const { key, value } of flat) {
      const hash = this.hash(key);
      const index = hash % this.capacity;
      // this.buckets[index].push([key, value]);
      this.insert(index, key, value);
      this.size++;
    }
  }
  bucketCounter() {
    const count = this.buckets.length;

    console.log(`This is the Total buckets: ${count}`);
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

const test = new HashMap();

// test.set("apple", "red");
// test.set("banana", "yellow");
// test.set("carrot", "orange");
// test.set("dog", "brown");
// test.set("elephant", "gray"); // 0.25 currentLOad
// test.set("frog", "green");
// test.set("grape", "purple");
// test.set("hat", "black");
// test.set("ice cream", "white");
// test.set("jacket", "blue");
// test.set("kite", "pink");
// test.set("lion", "golden");
// test.set("tiger", "divine");
test.set("asta", "clover");
test.set("asta", "demon");
test.set("asta", "luck");
test.set("aaap", "Anti-magic");
test.print();
