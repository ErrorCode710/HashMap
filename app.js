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
    // method to put the value on the buckets
    // TODO: Make a bucket checker it checks if the buckets is nearly full dependes on the load factor increase the bucket twice
    // TODO: Add a condition if the key is duplicate replace the old value to the new value

    // ANALYSIS
    // I NOTICE ITS LIKE IT KEEP LOOPING
    // ITS BECAUSE ITS KEEP ADDING ON THE SIZE IF WE USE THE SET

    // SET FLOW
    // CHECK CURRENT LOAD
    // IF CURRENT LOAD IS GREATHER THAN LOADFACTOR RESIZE BUCKETS THEN PUSH HASH ON THE BUCKETS
    // ELSE PUSH HASH ON THE BUCKETS

    const hash = this.hash(key);
    const index = hash % this.capacity;
    // const node = new Node(key, value);

    const currentLoad = this.size / this.capacity;
    // console.log(`This is node.next value :${node.next}`);
    this.restriction(index);

    if (currentLoad > this.loadfactor) {
      // console.log(`currentLoad Vale: ${currentLoad} and loadFactor Value: ${this.loadfactor}`);
      this.resize();
    }

    if (this.buckets[index] === null) {
      this.buckets[index] = new Node(key, value);
    } else {
      let current = this.buckets[index];

      console.log(current);
      // while (current.next !== null) {
      //   current = current.next;
      // }
      // current.next = node;
    }
    // this.buckets[index].push([key, value]);
    // this.buckets[index].push([key, value]);
    this.size++;
    // console.log(this.buckets);
  }
  insert() {}
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

    for (const [key, value] of flat) {
      const hash = this.hash(key);
      const index = hash % this.capacity;

      this.buckets[index].push([key, value]);
      this.size++;
    }
  }
  bucketCounter() {
    const count = this.buckets.length;

    console.log(`This is the Total buckets: ${count}`);
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const node = new Node();

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
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

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray"); // 0.25 currentLOad
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("tiger", "divine");
test.set("asta", "clover");
test.print();
