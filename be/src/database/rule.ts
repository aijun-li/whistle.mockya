import { NewRule, NewRuleData, Rule, RuleData } from '~/typings';
import prisma from './prisma';

export async function insertRule(collectionId: string, rule: NewRule) {
  const { id: defaultRuleDataId } = await insertRuleData({ label: 'default', value: '' });

  const data = await prisma.rule.create({
    data: {
      ...rule,
      type: rule.type as string,
      activeId: defaultRuleDataId,
      collection: {
        connect: {
          id: collectionId,
        },
      },
      data: {
        connect: {
          id: defaultRuleDataId,
        },
      },
    },
  });

  return data;
}

export function getRule(id: number) {
  return prisma.rule.findUniqueOrThrow({
    where: {
      id,
    },
  });
}

export function updateRule(id: number, rule: Rule) {
  const { type, pattern, enabled, delay, activeId, desc } = rule;

  return prisma.rule.update({
    where: {
      id,
    },
    data: {
      type: type as string,
      pattern,
      enabled,
      delay,
      activeId,
      desc,
    },
  });
}

export function deleteRule(id: number) {
  return prisma.rule.delete({
    where: {
      id,
    },
    include: {
      data: true,
    },
  });
}

export function insertRuleData(ruleData: NewRuleData, ruleId?: number) {
  const { label, value } = ruleData;

  return prisma.ruleData.create({
    data: {
      label,
      value,
      rule:
        typeof ruleId !== 'undefined'
          ? {
              connect: {
                id: ruleId,
              },
            }
          : undefined,
    },
  });
}

export function getRuleData(id: number) {
  return prisma.ruleData.findUniqueOrThrow({
    where: {
      id,
    },
  });
}

export function updateRuleData(id: number, ruleData: RuleData) {
  const { label, value } = ruleData;

  return prisma.ruleData.update({
    where: {
      id,
    },
    data: {
      label,
      value,
    },
  });
}

export function deleteRuleData(id: number) {
  return prisma.ruleData.delete({
    where: {
      id,
    },
  });
}
