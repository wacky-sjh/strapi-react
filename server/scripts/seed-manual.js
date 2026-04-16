'use strict';

async function hasAny(modelUid) {
  const existing = await strapi.documents(modelUid).findMany({
    pagination: { page: 1, pageSize: 1 },
  });
  return existing.length > 0;
}

async function ensureManualSeedData() {
  if (await hasAny('api::manual-entry.manual-entry')) {
    console.log('Manual entry data already exists. Skip manual seed.');
    return;
  }

  const large = await strapi.documents('api::manual-large.manual-large').create({
    data: {
      code: '2',
      title: '현장 운영',
      sortOrder: 2,
      publishedAt: new Date(),
    },
  });

  const medium = await strapi.documents('api::manual-medium.manual-medium').create({
    data: {
      code: '2-1',
      title: '등원 및 준비',
      sortOrder: 1,
      large: large.documentId,
      publishedAt: new Date(),
    },
  });

  const smallVehicle = await strapi.documents('api::manual-small.manual-small').create({
    data: {
      code: '2-1-1',
      title: '등원 운영 (차량팀/홀팀)',
      sortOrder: 1,
      medium: medium.documentId,
      publishedAt: new Date(),
    },
  });

  const smallMorning = await strapi.documents('api::manual-small.manual-small').create({
    data: {
      code: '2-1-3',
      title: '아침 조회 운영',
      sortOrder: 3,
      medium: medium.documentId,
      publishedAt: new Date(),
    },
  });

  const rows = [
    {
      title: '[차량팀] 업무 절차 상세',
      largeCategory: large.documentId,
      mediumCategory: medium.documentId,
      smallCategory: smallVehicle.documentId,
      subCategory: '[차량팀] 업무 절차',
      sortOrder: 1,
      content: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: '차량팀 등원 운영 절차 상세 예시입니다. 탑승 인원 확인, 안전벨트 점검, 도착 후 인수인계 순서로 진행합니다.',
            },
          ],
        },
      ],
    },
    {
      title: '아침 조회 운영 상세',
      largeCategory: large.documentId,
      mediumCategory: medium.documentId,
      smallCategory: smallMorning.documentId,
      subCategory: '',
      sortOrder: 2,
      content: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: '아침 조회 운영 상세 예시입니다. 출결 확인, 당일 공지 전달, 안전/위생 점검 항목 브리핑을 진행합니다.',
            },
          ],
        },
      ],
    },
  ];

  for (const row of rows) {
    await strapi.documents('api::manual-entry.manual-entry').create({
      data: {
        ...row,
        publishedAt: new Date(),
      },
    });
  }

  console.log(`Seeded manual entries: ${rows.length}`);
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await ensureManualSeedData();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
