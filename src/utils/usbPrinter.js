const ESC_INIT = [0x1b, 0x40];
const CUT_COMMAND = `\x1D\x56\x41`;

async function findPrinter() {
  const devices = await navigator.usb.getDevices();

  // Find a device with 'printer' in its product name (case-insensitive)
  const printer = devices.find((device) => {
    return (
      device.productName && device.productName.toLowerCase().includes("printer")
    );
  });

  return printer || null;
}

async function selectPrinter() {
  const printer = await navigator.usb.requestDevice({ filters: [] }); // Request without filters to show all devices
  return printer;
}

async function connectToPrinter(receiptText) {
  try {
    let usbDevice = await findPrinter();

    if (!usbDevice) {
      console.log(
        "No printer found automatically, prompting user to select a device."
      );
      usbDevice = await selectPrinter();
    }

    console.log("Connected to printer:", usbDevice);

    await usbDevice.open();
    await usbDevice.selectConfiguration(1); // Select the printer's configuration
    await usbDevice.claimInterface(0); // Claim the interface for communication

    // Encode the ESC/POS commands
    const encoder = new TextEncoder();
    const initCommandData = new Uint8Array(ESC_INIT);
    const receiptData = encoder.encode(receiptText);
    const cutCommandData = encoder.encode(CUT_COMMAND);

    // Initialize the printer and send data
    await sendToPrinter(usbDevice, initCommandData);
    await sendToPrinter(usbDevice, receiptData);
    await sendToPrinter(usbDevice, cutCommandData);

    await usbDevice.close();
    console.log("Print command sent successfully");
  } catch (error) {
    console.error("Error connecting to printer:", error);
  }
}

async function sendToPrinter(device, data) {
  try {
    await device.transferOut(1, data);
  } catch (error) {
    console.error("Error sending data to printer:", error);
  }
}

export default connectToPrinter;
