// Author: Gál Sándor
// This is a simple simulation of a two-elevator system using plain JavaScript.

// Detailed documentation about how the project works is available in the README.md file.

// The building has 7 floors (0 = ground floor, 6 = top floor).
const FLOORS = 7;

// Initial state of the two elevators: one starts at the ground floor, the other at the top floor.
const lifts = [
  { name: "A 🛗", currentFloor: 0 },
  { name: "B 🛗", currentFloor: 6 },
];

// Rendering the building and its floors.
function renderFloors() {
  const building = document.getElementById("building");
  building.innerHTML = ""; // Clear previous content.

  // Draw floors from top to bottom.
  for (let i = FLOORS - 1; i >= 0; i--) {
    const floor = document.createElement("div");
    floor.className = "floor";

    // Floor label ("Ground" = floor 0).
    const label = document.createElement("div");
    label.textContent = i === 0 ? "Ground" : `Floor ${i}`;

    // Button panel (⬆️⬇️).
    const panel = document.createElement("div");
    panel.className = "panel";

    // ⬆️ button (not shown on the top floor).
    if (i < FLOORS - 1) {
      const up = document.createElement("button");
      up.textContent = "⬆️";
      up.onclick = () => callElevator(i, "up");
      panel.appendChild(up);
    }

    // ⬇️ button (not shown on the ground floor).
    if (i > 0) {
      const down = document.createElement("button");
      down.textContent = "⬇️";
      down.onclick = () => callElevator(i, "down");
      panel.appendChild(down);
    }

    // Display elevator positions (if any elevator is currently on this floor).
    const liftPos = document.createElement("div");
    liftPos.className = "lift-position";
    liftPos.textContent =
      lifts
        .filter((l) => l.currentFloor === i)
        .map((l) => l.name)
        .join(", ") || "";

    // Assemble and append elements to the DOM.
    floor.appendChild(label);
    floor.appendChild(panel);
    floor.appendChild(liftPos);
    building.appendChild(floor);
  }
}

// Call an elevator to a specific floor in a specific direction.
function callElevator(requestedFloor, direction) {
  console.log(`Call from floor ${requestedFloor}, direction: ${direction}`);
  const chosenLift = getClosestLift(requestedFloor);
  console.log(`Lift ${chosenLift.name} is coming`);
  moveLift(chosenLift, requestedFloor);
}

// Select the closest elevator to the requested floor.
function getClosestLift(floor) {
  const distances = lifts.map((lift) => ({
    lift,
    distance: Math.abs(lift.currentFloor - floor),
  }));

  // First by shortest distance, then prefer the elevator on the lower floor.
  distances.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    return a.lift.currentFloor - b.lift.currentFloor;
  });

  return distances[0].lift;
}

// Move the elevator to the target floor, in 0.5 second steps.
function moveLift(lift, targetFloor) {
  const interval = setInterval(() => {
    if (lift.currentFloor < targetFloor) {
      lift.currentFloor++;
      lift.direction = "up";
    } else if (lift.currentFloor > targetFloor) {
      lift.currentFloor--;
      lift.direction = "down";
    } else {
      lift.direction = null;
      clearInterval(interval); // Stop movement when the elevator reaches the destination.
    }
    renderFloors(); // Re-render after each step.
  }, 500);
}

// Render the building once at the beginning.
renderFloors();
