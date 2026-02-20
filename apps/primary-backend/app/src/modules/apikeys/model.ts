import { t } from "elysia";

export namespace Apikeymodel {
  export const createApiKeySchema = t.Object({
    name: t.String(),
  });
  export type createApiKeySchema = typeof createApiKeySchema.static;

  export const createApiKeyResponse = t.Object({
    id: t.String(),
    apiKey: t.String(),
  });
  export type createApiKeyResponse = typeof createApiKeyResponse.static;

  export const updateApiKeySchema = t.Object({
    id: t.String(),
    disabled: t.Boolean(),
  });
  export type updateApiKeySchema = typeof updateApiKeySchema.static;

  export const updateApiKeyResponseSchema = t.Object({
    message: t.Literal("Updated API key successfully"),
  });
  export type updateApiKeyResponseSchema =
    typeof updateApiKeyResponseSchema.static;

  export const updateApiKeyFailedResponseSchema = t.Object({
    message: t.Literal("Updating API key unsuccessful"),
  });
  export type updateApiKeyFailedResponseSchema =
    typeof updateApiKeyFailedResponseSchema.static;

  export const getApiKeyResponseSchema = t.Object({
    apiKeys: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        apiKey: t.String(),
        lastUsed: t.Nullable(t.Date()),
        creditsConsumed: t.Number(),
        disabled: t.Boolean()
      }),
    ),
  });
  export type getApiKeyResponseSchema = typeof getApiKeyResponseSchema.static;
  export const deleteApiKeySchema = t.Object({
    message: t.Literal("API key deleted successfully"),
  });
  export type deleteApiKeySchema = typeof deleteApiKeySchema.static;
  export const deleteApiKeyResponseFailedSchema = t.Object({
    message: t.Literal("Deleting API key unsuccessful"),
  });

  
  export type deleteApiKeyResponseFailedSchema =
    typeof deleteApiKeyResponseFailedSchema.static;
}

