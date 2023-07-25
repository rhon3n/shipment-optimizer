import fs from 'fs';
import chalk from 'chalk';

// Function to calculate the suitability score of a driver for a shipment
export function calculateSuitabilityScore(destination, driver) {
  // Define vowels and consonants assuming that y is always a consonant
  const vowels = 'AEIOUaeiou';
  const consonants = 'BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz';
  const destinationLength = destination.length;
  const driverLength = driver.length;

  // Calculate the suitability score
  let suitabilityScore = 0;
  if (destinationLength % 2 === 0) {
    suitabilityScore = driver.split('').filter(char => vowels.includes(char)).length * 1.5;
  } else {
    suitabilityScore = driver.split('').filter(char => consonants.includes(char)).length * 1;
  }

  // Check for common factors between the destination length and driver length
  for (let i = 2; i <= Math.min(destinationLength, driverLength); i++) {
    if (destinationLength % i === 0 && driverLength % i === 0) {
      suitabilityScore *= 1.5;
      break;
    }
  }

  return suitabilityScore;
}

// Function to find the optimal matching between shipments and drivers
export function optimizeShipments(destinations, drivers) {
  const matches = new Map();
  
  // Check each destination for the best driver
  for (const destination of destinations) {
    let topScore = 0;
    let topDriver = null;

    for (const driver of drivers) {
      const score = calculateSuitabilityScore(destination, driver);

      // Check if the driver is available and has a higher score than the current top score
      if (!matches.has(driver) && score > topScore) {
        topScore = score;
        topDriver = driver;
      }
    }

    // Assign the shipment to the driver with the highest score
    if (topDriver !== null) {
      matches.set(topDriver, destination);
    }
  }
  return matches;
}

// Function to calculate the total suitability score
export function calculateTotalSuitabilityScore(matches) {
  let totalSuitabilityScore = 0;

  for (const [driver, destination] of matches) {
    totalSuitabilityScore += calculateSuitabilityScore(destination, driver);
  }

  return totalSuitabilityScore;
}


function main() {
  // Check if the correct number of arguments were provided
  if (process.argv.length !== 4) {
      console.error('Usage: node app.js <shipment_file> <drivers_file>');
      process.exit(1);
  }

  // Accept command-line arguments for shipment destinations and drivers files
  const destinationsFilePath = process.argv[2];
  const driversFilePath = process.argv[3];
  let destinations;
  let drivers;

  // Read the shipment destinations and drivers from the files
  try {
    destinations = fs.readFileSync(destinationsFilePath, 'utf8').split('\n');
  } catch (error) {
    console.error(`${chalk.red.bold('!!Error: could not read destinations file from:')} ${chalk.bold(destinationsFilePath)}\n\n${chalk.italic('Make sure the file exists and is readable.')}`);
    console.error(error);
    process.exit(1);
  }
  
  try {
    drivers = fs.readFileSync(driversFilePath, 'utf8').split('\n');
  } catch (error) {
    console.error(`${chalk.red.bold('!!Error: could not read drivers file from:')} ${chalk.bold(driversFilePath)}\n\n${chalk.italic('Make sure the file exists and is readable.')}`);
    console.error(error);
    process.exit(1);
  }

  const totalSuitabilityScore = calculateTotalSuitabilityScore(optimizeShipments(destinations, drivers));
  const matches = optimizeShipments(destinations, drivers);

  // Print the total suitability score and the shipment-driver matches
  console.log(`${chalk.bold('Total suitability score:')} ${chalk.green.bold.underline(totalSuitabilityScore)}\n\n${chalk.bold('Shipment-Driver Matches:')}`);

  for (const [driver, destination] of matches) {
    console.log(`${chalk.yellow.bold.italic(driver)} --> ${chalk.cyan.bold(destination)}`);
  }
}


// Only run the main function if this script is directly invoked
if (import.meta.url.match(process.argv[1])) {
  main();
}
