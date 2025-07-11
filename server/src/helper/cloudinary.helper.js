// https://res.cloudinary.com/dpgnyhqvc/image/upload/v1752224341/noteOrganizer/mo9w323znwi6kvxh8xmy.jpg

const pathWithoutExtensionURL = async (imageURL) => {
  const pathSegment = imageURL.split("/");
  const lastSegment = pathSegment[pathSegment.length - 1];
  const valueWithoutExtension = lastSegment.split(".")[0];
  return valueWithoutExtension;
};

module.exports = { pathWithoutExtensionURL };

// const pathWithoutExtensionURL = (imageURL) => {
//   try {
//     const uploadIndex = imageURL.indexOf("/upload/");
//     if (uploadIndex === -1) return null;

//     // Get everything after /upload/
//     const afterUpload = imageURL.slice(uploadIndex + 8); // 8 = "/upload/".length

//     // Remove version (e.g., v1752152824/)
//     const afterVersion = afterUpload.replace(/^v\d+\//, "");

//     // Remove extension (.jpg, .png, etc.)
//     const lastDotIndex = afterVersion.lastIndexOf(".");
//     const pathWithoutExtension = afterVersion.substring(0, lastDotIndex);

//     return pathWithoutExtension; // final result
//   } catch (error) {
//     console.error("Error parsing Cloudinary public_id:", error);
//     return null;
//   }
// };



// module.exports = { pathWithoutExtensionURL };
