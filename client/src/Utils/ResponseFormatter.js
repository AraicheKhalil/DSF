import { json } from "react-router-dom";

export function formatResponse(responseArray) {
  // Assuming the response is an array with a single string element.
  const response = responseArray[0];

  if (!response.startsWith("```json")) {
    throw new Error(response);
  }
  var jsonResponse;
  if (response.startsWith("```json")) {
    jsonResponse = response.replace(/```json\n|\n```/g, "").trim();
  } else {
    jsonResponse = response.replace(/```\n|\n```/g, "").trim();
  }
  // Remove markdown code block syntax and extra whitespace/newlines.

  try {
    return JSON.parse(jsonResponse);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw error;
  }
}

export function formatDocument(jsonResponse) {
  return formatObject(jsonResponse);
}

function formatObject(obj, indent = 0) {
  let formattedResponse = "";

  for (const key in obj) {
    const value = obj[key];

    // Indentation for nested objects
    const indentation = "  ".repeat(indent);

    // Check if the value is an object
    if (typeof value === "object") {
      // If it's an array, format each element
      if (Array.isArray(value)) {
        formattedResponse += `${indentation}${key}:\n`;
        value.forEach((element) => {
          if (typeof element === "object") {
            formattedResponse += formatObject(element, indent + 1);
          } else {
            formattedResponse += `${indentation}  ${element}\n`;
          }
        });
      } else {
        // If it's an object, recursively format it
        formattedResponse += `${indentation}${key}:\n`;
        formattedResponse += formatObject(value, indent + 1);
      }
    } else {
      // Otherwise, just append the key-value pair
      formattedResponse += `${indentation}${key}: ${value}\n`;
    }
  }

  return formattedResponse;
}

export function formatExtractedData(obj, indent = 0) {
  let formattedResponse = "";

  for (const key in obj) {
    const value = obj[key];

    // Indentation for nested objects
    const indentation = "  ".repeat(indent);

    // Check if the value is an object
    if (typeof value === "object") {
      // If it's an array, format each element
      if (Array.isArray(value)) {
        // formattedResponse += `${indentation}${key}:\n`;
        value.forEach((element) => {
          if (typeof element === "object") {
            formattedResponse += formatExtractedData(element, indent + 1);
          } else {
            // formattedResponse += `${indentation}  ${element}\n`;
          }
        });
      } else {
        // If it's an object, recursively format it
        // formattedResponse += `${indentation}${key}:\n`;
        formattedResponse += formatExtractedData(value, indent + 1);
      }
    } else {
      console.log("Values ==>", value);
      // Otherwise, just append the key-value pair
      formattedResponse += `${value}\n`;
    }
  }

  return formattedResponse;
}

export const formatForCopy = (data, prefix = "") => {
  let formattedString = "";

  if (typeof data === "object" && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        formattedString += `${prefix}${key}:\n`;
        formattedString += formatForCopy(value, prefix + "  "); // Increase indentation for nested objects
      } else if (Array.isArray(value)) {
        formattedString += `${prefix}${key}:\n`;
        value.forEach((item, index) => {
          formattedString += `${prefix}  Item ${index + 1}:\n`; // Assuming key is plural for array
          formattedString += formatForCopy(item, prefix + "    "); // Increase indentation for array items
        });
      } else {
        formattedString += `${prefix}${key}: ${value}\n`;
      }
    });
  } else {
    formattedString += `${prefix}${data}\n`;
  }

  return formattedString;
};
