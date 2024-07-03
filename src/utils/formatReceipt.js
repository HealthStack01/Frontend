const formatReceipt = ({
  organizationName,
  address,
  location,
  currentUserName,
  patientName,
  cartItems,
  totalAmount,
}) => {
  const date = new Date();
  const CENTER_ALIGN = "\x1B\x61\x01"; // ESC a 1 Center alignment
  const LEFT_ALIGN = "\x1B\x61\x00"; // ESC a 0 Left alignment
  const BOLD_ON = "\x1B\x45\x01"; // ESC E 1 Bold on
  const BOLD_OFF = "\x1B\x45\x00"; // ESC E 0 Bold off
  const NEW_LINE = "\x0A"; // New line
  const CUT_COMMAND = "\x1D\x56\x41"; // ESC i Full cut

  const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;

  // Define column widths relative to the total width of 64 characters
  const maxLengths = {
    sn: 4, // 4 characters
    // category: 14, // 14 characters
    description: 30, // 22 characters
    amount: 14, // 8 characters
  };

  // Function to add padding to each column
  const padText = (text, length) => text.toString().padEnd(length);

  let receiptText = `${CENTER_ALIGN}${BOLD_ON}${organizationName}${BOLD_OFF}${NEW_LINE}
  ${CENTER_ALIGN}${address}${NEW_LINE}
  ${CENTER_ALIGN}${location}${NEW_LINE}
  ${LEFT_ALIGN}Date: ${formattedDate}${NEW_LINE}
  Issued By: ${currentUserName}${NEW_LINE}
  Issued To: ${patientName}${NEW_LINE}
  ${NEW_LINE}  ${BOLD_ON}${padText("SN", maxLengths.sn)}${padText(
    "Description",
    maxLengths.description
  )}${padText("Amount", maxLengths.amount)}${BOLD_OFF}${NEW_LINE}`;
  cartItems.forEach((item, index) => {
    receiptText += `  ${LEFT_ALIGN}${padText(
      index + 1,
      maxLengths.sn
    )}${padText(item.description, maxLengths.description)}${padText(
      item.amount,
      maxLengths.amount
    )}${NEW_LINE}`;
  });

  receiptText += `-------------------------------${NEW_LINE}
  ${BOLD_ON}Total Amount(NGN): ${totalAmount}${BOLD_OFF}${NEW_LINE}${NEW_LINE}-------------------------------${NEW_LINE}
  ${CENTER_ALIGN}Thanks for your Patronage${NEW_LINE}
  ${NEW_LINE.repeat(3)}${CUT_COMMAND}`;

  return receiptText;
};

export default formatReceipt;
