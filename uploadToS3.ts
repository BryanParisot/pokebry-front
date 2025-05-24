import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  region: "eu-west-3", // à adapter
});

export const uploadToS3 = async (file: File, userId: number) => {
  const fileName = `${userId}_${Date.now()}_${file.name}`;
  const params = {
    Bucket: "ton-bucket-name",
    Key: fileName,
    Body: file,
    ContentType: file.type,
    ACL: "public-read",
  };

  const data = await s3.upload(params).promise();
  return data.Location; // l'URL de l’image
};
