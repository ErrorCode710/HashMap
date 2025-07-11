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

  set(key, value) {
    const hash = this.hash(key);
    const currentLoad = this.size / this.capacity;

    if (currentLoad > this.loadfactor) {
      this.resize();
    }

    const index = hash % this.capacity;
    this.restriction(index);
    this.insert(index, key, value);
    this.size++;
  }

  get(key) {
    const hash = this.hash(key);
    const index = hash % this.capacity;

    let current = this.buckets[index];
    if (current.length !== 0) {
      while (current !== null) {
        if (current.key === key) {
          return `${current.value}`;
        }
        current = current.next;
      }
    }

    return null;
  }
  has(key) {
    const index = this.hash(key) % this.capacity;
    if (this.buckets[index].length === 0) {
      return false;
    }
    let current = this.buckets[index];
    while (current !== null) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
  remove(key) {
    const index = this.hash(key) % this.capacity;
    if (this.buckets[index].length === 0) {
      return false;
    }

    let current = this.buckets[index];
    let prev = null;

    while (current !== null) {
      // when we enter on this code block the current is the head or node 1
      // Node 1
      if (current.key === key) {
        // check if node 1 is the key we are finding
        // node 1 is the key we are finding
        if (prev === null) {
          prev = this.buckets[index]; // head
        } else {
          prev.next = current.next;
        }
        return true;
      }
      prev = current;
      current = current.next;
    }
    return false;
  }
  length() {
    const count = this.buckets.length;

    console.log(`the number of stored keys: ${count}`);
    return count;
  }
  clear() {
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
    this.size = 0;
  }
  keys() {
    const keys = [];
    for (const head of this.buckets) {
      let current = head;
      if (current.length !== 0) {
        while (current !== null) {
          keys.push(current.key);
          current = current.next;
        }
      }
    }
    console.log(keys);
  }
  values() {
    const values = [];
    for (const head of this.buckets) {
      let current = head;
      if (current.length !== 0) {
        while (current !== null) {
          values.push(current.value);
          current = current.next;
        }
      }
    }
    console.log(values);
  }
  entries() {
    const pair = [];
    for (const head of this.buckets) {
      let current = head;
      if (current.length !== 0) {
        while (current !== null) {
          pair.push([current.key, current.value]);
          current = current.next;
        }
      }
    }
    console.log(pair);
  }
  //#region  Helper Method
  print() {
    const currentLoad = this.size / this.capacity;
    console.log(this.loadfactor);
    console.log(this.size);
    console.log(currentLoad);
    console.log(this.buckets);
    this.length();
  }
  resize() {
    console.log("Resizing Start");
    const oldbuckets = this.buckets;
    this.capacity = this.capacity * 2;

    // const flat = oldbuckets.flat();

    const flat = [];

    for (const head of oldbuckets) {
      let current = head;
      if (current.length !== 0) {
        while (current !== null) {
          flat.push({ key: current.key, value: current.value });
          current = current.next;
        }
      }
    }
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
    // console.log("Flat Value");
    // console.log(flat);

    this.size = 0;

    for (const { key, value } of flat) {
      const hash = this.hash(key);
      const index = hash % this.capacity;

      // this.insert(index, key, value);
      this.insert(this.hash(key) % this.capacity, key, value);
      this.size++;
    }
  }
  restriction(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  insert(index, key, value) {
    if (this.buckets[index].length === 0) {
      let current = this.buckets[index];

      this.buckets[index] = new Node(key, value);
    } else {
      let current = this.buckets[index];

      while (current.next !== null) {
        current = current.next;
      }
      if (current.key === key) {
        current.value = value;
        return;
      }

      current.next = new Node(key, value);
    }
  }

  //#endregion
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
test.set("tiger", "divine"); // 0.75 current load = resizing of buckets
//#region
// {
//   "key": "tiger",
//   "value": "divine",
//   "hash": 110358719,
//   "index": 15,
//   "currentLoad": 0.75
// }

// {
//   "key": "tiger",
//   "value": "divine",
//   "hash": 110358719,
//   "index": 15,
//   "currentLoad": 0.75,
//   "capacity": 16
// }

// {
//   "key": "tiger",
//   "value": "divine",
//   "hash": 110358719,
//   "index": 15,
//   "currentLoad": 0.75,
//   "capacity": 16
// }
//#endregion
test.set("asta", "clover");
test.set("asta", "demon");
test.set("asta", "luck");
test.set("aaap", "Anti-magic");
test.set("aao", "pirate king");
test.set("aaac", "Emperor");

test.print();
console.log(test.get("hat"));
// test.remove("aao");
console.log(test.remove("aaap"));
console.log(test.length());
test.keys();
test.values();
test.entries();
// test.clear();
