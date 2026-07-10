// Cliente do Cloudflare R2 (compatível com S3) — usado para subir e apagar fotos de produto.
// Só roda no servidor (Server Actions / Route Handlers), nunca no navegador.

import "server-only";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL!;

/**
 * Sobe um arquivo de imagem para o bucket "products" e devolve a URL pública final.
 * `key` é o caminho dentro do bucket, ex: "produtos/00214-1699999999.webp".
 */
export async function uploadProductImage(
  key: string,
  file: Buffer,
  contentType: string
): Promise<string> {
  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return `${PUBLIC_URL}/${key}`;
}

/**
 * Remove uma imagem antiga do bucket a partir da URL pública salva no produto.
 * Chamado sempre que uma foto é substituída, para não acumular lixo no storage.
 */
export async function deleteProductImage(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.startsWith(PUBLIC_URL)) return;

  const key = imageUrl.replace(`${PUBLIC_URL}/`, "");

  await r2.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}

/** Gera uma key única e segura a partir do código do produto e do nome original do arquivo. */
export function buildImageKey(productCode: string, originalFileName: string): string {
  const ext = originalFileName.split(".").pop()?.toLowerCase() || "webp";
  const safeCode = productCode.replace(/[^a-zA-Z0-9-_]/g, "") || "produto";
  return `produtos/${safeCode}-${Date.now()}.${ext}`;
}
