## Introduction

I received this test assignment from the WebGurus team and was excited to start working on it.<br>
In this documentation, I describe in detail how I understood the task, how I approached the problem, and how I implemented the solution step by step.<br>
My goal is to explain the system's logic and my thinking in a clear and understandable way.

---

### 1. Understanding the Task

When I first read the task description, it seemed complex, so I decided to ask ChatGPT for help in order to better understand it.

I approached it **as if I were asking a client for more details and clarifications** about the requirements.

I believe that **before I start coding**, it's important to **thoroughly understand the problem**, so I can avoid going in the wrong direction during implementation.

As the next step, I tried to break the problem into smaller parts and started building a working solution based on that.

---

### 2. System Goal

The purpose of this task is to build a **simulation of a building elevator control system with two elevators**.

Based on the task description, I identified the following core requirements:
* The building has **7 floors**, indexed from 0 to 6.
* There are **2 elevators**: Elevator A and Elevator B.
* The system must decide **which elevator should respond** to a call:
  * The elevator **closest to the requested floor** will move.
  * If both elevators are equally distant, the one **on the lower floor** will respond.
* The system must display:
  * **The current position of each elevator**
  * **The direction of movement**
  * **The selected destination**

---

### 3. Planning – Technologies Used

I chose to implement this task using **HTML, CSS, and JavaScript**. My goal was to build a simple, functional application that provides quick visual feedback.
The purpose was not to create a beautiful UI, but to show my **thinking process**, **logical structure**, and **coding style**.

During the implementation, I applied a **JavaScript-based logic** where:
  * the elevator states are stored in objects,
  * and the events are handled through functions.

I first created the `index.html` and `styles.css` files, using minimal code in them.
Then I focused mainly on the `elevator.js` file, which contains the main logic.
Therefore, in this documentation, I do not describe the HTML and CSS files in detail, only the contents and behavior of `elevator.js`.

In the `index.html` file, there's a `div` element with the ID `"building"` placed just after the `<h1>` heading. This is dynamically populated from the JavaScript code to generate the building layout.

---

### 4. Code & Behaviour (`elevator.js`)

**4.1. Defining the Number of Floors**

```
const FLOORS = 7;
```

This constant (`const`) defines how many levels the building has. Since we start counting from 0, this represents floors `0` through `6`, resulting in a total of **7 floors** (Ground + 6 upper floors).
We use **uppercase letters** for the variable name to indicate that it is a constant value, which will not change during the execution of the program.

**4.2. Initializing the Elevators**

```
const lifts = [
  { name: "A 🛗", currentFloor: 0 },
  { name: "B 🛗", currentFloor: 6 },
];
```

This is an **array** that contains two **objects** – representing the two elevators:
* `name`: an identifier or emoji that helps distinguish between the elevators,
* `currentFloor`: stores the current floor the elevator is on.
At the start of the program, one elevator is on the ground floor (`0`), and the other is on the top floor (`6`).

**4.3. Rendering the Building – `renderFloors()`**

```
function renderFloors() {
  const building = document.getElementById("building");
  building.innerHTML = "";
  ...
}
```

This function **renders the entire building** into the browser. For each floor, it creates:
* a floor label (e.g., `Floor 4` or `Ground`),
* a direction button panel (⬆️, ⬇️),
* and a display indicating whether there is an elevator on that floor.
* If the current floor is 0, the label will show as **Ground**.

```
for (let i = FLOORS - 1; i >= 0; i--) {
```

This loop draws the building from top to bottom, starting from the highest floor down to the ground floor.

**4.4. Displaying Buttons and Elevator Positions**

```
if (i < FLOORS - 1) { ... ⬆️ button ... }
if (i > 0)         { ... ⬇️ button ... }
```

The buttons are shown **only if there is somewhere to go**:
* No up-button on the top floor.
* No down-button on the ground floor.

```
const liftPos = document.createElement("div");
liftPos.textContent = lifts
  .filter(l => l.currentFloor === i)
  .map(l => l.name)
  .join(", ") || "";
```

This checks whether there is an elevator on the current floor.
If so, it displays the elevator’s name.

**4.5. Calling the Elevator – `callElevator()`**

```
function callElevator(requestedFloor, direction) {
   const chosenLift = getClosestLift(requestedFloor);
   moveLift(chosenLift, requestedFloor);
}
```

This function is triggered when a button is pressed. Its responsibilities:
* Determine which elevator is **closest** to the requested floor,
* Start the movement of that elevator.

**4.6. Selecting the Closest Elevator – `getClosestLift()`**

```
function getClosestLift(floor) {
  ...
}
```

This function determines which elevator is **closest** to the called floor.
If both elevators are equally distant, it selects the one located on the **lower floor**.

**4.7. Moving the Elevator – `moveLift()`**

```
function moveLift(lift, targetFloor) {
   const interval = setInterval(() => {
     ...
   }, 500);
}
```

This function **moves the elevator step by step**:
* It updates every 500 milliseconds,
* At each step, it re-renders the building,
* Once the elevator reaches the target floor, it stops the interval.

The `setInterval` method starts a **timed loop**, which continuously updates the elevator’s position, simulating movement.

**4.8. Initial Rendering**

```
renderFloors();
```

This runs **once** when the page loads to render the initial state of the building:
Two elevators, one on the **ground floor**, and one on the **top floor** (floor 6).

---

### 5. Diagram – Elevator Logic

The diagram below illustrates the step-by-step logic behind the elevator control system.

**Process flow:**
1. The user presses an ⬆️ or ⬇️ button on a specific floor.
2. The system determines which elevator is closest to the requested floor.
3. The selected elevator starts moving toward the target floor.
4. While moving, the system continuously updates the display (render).
5. Once the elevator reaches the target floor, the animation stops.

This diagram makes the control logic easier to understand and visualize.
<p align="center">
<img src="https://raw.githubusercontent.com/galsandor2012/elevator-control-system/main/elevator-logic-diagram.png" width="500" />
</p>

---

### 6. Summary / Conclusion

While working on this task, I focused first on understanding the problem clearly, then breaking it into smaller parts, and finally building up the solution step by step. To support this process, I used a variety of resources: my own experience, online articles, developer documentation, and I also used ChatGPT, especially for understanding state management and the structure of functions.

I carefully went through all parts of the code and I’m confident that I can explain in my own words why I wrote things the way I did. This task was a great learning opportunity for me, and I tried to make the most of it.

At the moment, designing functions and structuring logic is not my strongest area, but I’m eager to improve and gain a deeper understanding. I believe this task already helped me grow in that direction and motivated me to keep practicing and learning further.

---

### 7. Live Demo Link
You can view the working version of the project at the following link:

[Live demo](https://elevator-control-system-galsandor.netlify.app/)



