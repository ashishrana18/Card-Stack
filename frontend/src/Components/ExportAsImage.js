import html2canvas from "html2canvas";

const exportAsImage = async (element, imageFileName) => {
  const downloadSection = element.querySelector(".download-section");
  const originalDisplayStyle = window.getComputedStyle(downloadSection).getPropertyValue("display");
  downloadSection.style.display = "none";

  try {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);
    console.log(image); // Log the data URL to the console
    downloadImage(image, imageFileName);
  } catch (error) {
    console.error("Error exporting as image:", error);
  } finally {
    // Restore the original display style
    downloadSection.style.display = originalDisplayStyle;
  }
};

const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;
  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  fakeLink.remove();
};

export default exportAsImage;
