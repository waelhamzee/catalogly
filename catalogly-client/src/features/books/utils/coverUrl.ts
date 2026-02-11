const bucket = import.meta.env.VITE_S3_BUCKET ?? "";
const region = import.meta.env.VITE_AWS_REGION ?? "";

export function getCoverImageUrl(key: string): string {
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}
