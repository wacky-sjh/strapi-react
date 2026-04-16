import type { Core } from '@strapi/strapi';

const PUBLIC_READ_ACTIONS = ['find', 'findOne'] as const;
const PUBLIC_MANUAL_APIS = ['manual-entry', 'manual-large', 'manual-medium', 'manual-small'] as const;

async function ensurePublicManualPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!publicRole) return;

  for (const apiName of PUBLIC_MANUAL_APIS) {
    for (const action of PUBLIC_READ_ACTIONS) {
      const actionName = `api::${apiName}.${apiName}.${action}`;
      const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: { action: actionName, role: publicRole.id },
      });
      if (existing) continue;

      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action: actionName,
          role: publicRole.id,
        },
      });
    }
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicManualPermissions(strapi);
  },
};
