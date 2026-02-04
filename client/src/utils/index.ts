
/**
 * Calculate the number of days left until a deadline
 * @param deadline - The deadline date string or Date object
 * @returns Number of days left as a string (rounded to nearest whole day)
 */



export const daysLeft = (deadline: string | Date | number): string => {
    let deadlineTime: number;

    if (typeof deadline === 'string') {
        deadlineTime = new Date(deadline).getTime();
    } else if (typeof deadline === 'number') {
        deadlineTime = deadline;
    } else {
        deadlineTime = deadline.getTime();
    }

    const difference = deadlineTime - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);

    // Return 0 if deadline has passed
    const days = Math.max(0, Math.round(remainingDays));
    return days.toString();
};


/**
 * Calculate the percentage of a goal that has been reached
 * @param goal - The target amount to reach
 * @param raisedAmount - The amount raised so far
 * @returns Percentage as a whole number (0-100)
 */

export const calculateBarPercentage = (goal: number, raisedAmount: number): number => {
  // Guard against division by zero or negative goals
  if (goal <= 0) return 0;
  
  const percentage = Math.round((raisedAmount * 100) / goal);
  
  // Ensure percentage stays between 0 and 100
  return Math.min(100, Math.max(0, percentage));
};


/**
 * Check if a URL points to a valid image
 * @param url - The image URL to check
 * @param callback - Callback function that receives a boolean indicating if image is valid
 */




export const checkIfImage = (
  url: string, 
  callback: (isValid: boolean) => void
): void => {
  const img = new Image();
  img.src = url;

  // If already loaded (cached)
  if (img.complete) {
    callback(true);
    return;
  }

   // Set up load and error handlers
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
