# Shipment Optimizer

The Shipment Optimizer is a command line tool written in NodeJS that allows you to optimize your shipments between multiple locations with an equal amount of drivers.

## Assumptions

- The number of drivers is equal to the number of destinations
- The letter y is considered a consonant
- White space is included in the length of a string
- The filetype of the input files is .txt

## Solution Formation

Steps I thought of and executed to solve the problem:

### Step 1: Address the problem

1. Create a function, `calculateSuitabilityScore`, to calculate and return the suitability score of a driver for a given destination.
2. Create a function, `optimizeShipments`, to optimize matching between destinations and drivers based on suitability score.
3. Create a function, `calculateTotalSuitabilityScore`, that will return the total suitability score of a given set of matches.

### Step 2: Render the output

1. Create a function that handles the input and output of the program.
   - Check for valid input.
   - Read the input files.
   - Call the functions created in Step 1.
   - Render the output.

## Libraries/Tools used

- Written in Node using `import` syntax. Tested using [Node.js](https://nodejs.org/en/) v18.15.0
- Using [Mocha](https://mochajs.org/) v10.2.0 for testing.
- Console output styled using [Chalk](https://www.npmjs.com/package/chalk) v5.3.0.

## Getting Started

### Installation

1. Clone the repo to your local machine in the directory of your choice _(e.g. ~/dev/)_
   ```sh
   git clone https://github.com/rhon3n/shipment-optimizer.git
   ```
2. Change to the root directory of the project
   ```sh
   cd shipment-optimizer
   ```
3. Install NPM packages
   ```sh
    npm install
   ```
4. Place your destinations and drivers files _(be sure they are .txt files)_ in the root directory of the project. See the [Using the Shipment Optimizer](#using-the-shipment-optimizer) section for more information on the format of these files.

### Using the Shipment Optimizer

Once installed, it can be used by running the following command in the terminal of your choice the root directory of the project:

```sh
## in ~/../shipment-optimizer/
node app.js <name_of_destinations_file> <name_of_drivers_file>
```

The destinations file should be a text file with a list of destinations, one per line. The drivers file should be a text file with a list of drivers, one per line. The output will be the total suitability score and a list of drivers matched with destinations one per line, with the driver's name followed by the destinations they will be delivering to.

## Testing

The Shipment Optimizer uses Mocha for testing. To run the tests, run the following command in the root directory of the project:

```sh
## in project root
npm test
```

## Decisions and Tradeoffs

- I decided to go with a procedural approach to solving the problem, as I felt it would be easier to test and reason about.
- There are areas of the code that could be improved. However, given the time constraints, I decided to focus on getting the code working and tested.
- I originally wanted to use TypeScript to type check the code. However, since the problem was relatively simple, I decided to use plain JavaScript to save time and reduce complexity.

## Future Improvements

This is a coding assessment with a purposely limited scope. If it were a real-world project, I would consider the following improvements:

- Adding more tests to cover edge cases.
- Adding TypeScript to type check the code.
- Adding input validation.
- Adding a UI to make it easier to use.
- Adding CI/CD to automate testing and deployment.
