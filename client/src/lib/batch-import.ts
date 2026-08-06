/**
 * 批次匯入驗證系統
 * 支援一次匯入 20 家店，自動驗證與報告
 */

import { type Restaurant } from './restaurants';

export interface ImportResult {
  success: boolean;
  totalCount: number;
  successCount: number;
  failureCount: number;
  errors: ImportError[];
  timestamp: string;
}

export interface ImportError {
  index: number;
  name: string;
  field: string;
  error: string;
  severity: 'error' | 'warning';
}

export interface ValidationRule {
  field: keyof Restaurant;
  required: boolean;
  validator?: (value: any) => boolean;
  errorMessage?: string;
}

const VALIDATION_RULES: ValidationRule[] = [
  {
    field: 'name',
    required: true,
    validator: (v) => typeof v === 'string' && v.length > 0,
    errorMessage: '店名不能為空',
  },
  {
    field: 'nameVi',
    required: true,
    validator: (v) => typeof v === 'string' && v.length > 0,
    errorMessage: '越南店名不能為空',
  },
  {
    field: 'address',
    required: true,
    validator: (v) => typeof v === 'string' && v.length > 0,
    errorMessage: '地址不能為空',
  },
  {
    field: 'mapsUrl',
    required: true,
    validator: (v) => typeof v === 'string' && v.includes('google.com/maps'),
    errorMessage: '無效的 Google Maps 連結',
  },
  {
    field: 'latitude',
    required: true,
    validator: (v) => typeof v === 'number' && v >= -90 && v <= 90,
    errorMessage: '無效的緯度',
  },
  {
    field: 'longitude',
    required: true,
    validator: (v) => typeof v === 'number' && v >= -180 && v <= 180,
    errorMessage: '無效的經度',
  },
  {
    field: 'photoUrl',
    required: false,
    validator: (v) => typeof v === 'string' && (v.startsWith('http') || v.startsWith('/manus-storage')),
    errorMessage: '無效的照片 URL',
  },
];

/**
 * 驗證單個店家資料
 */
export function validateRestaurant(restaurant: Partial<Restaurant>, index: number): ImportError[] {
  const errors: ImportError[] = [];

  VALIDATION_RULES.forEach((rule) => {
    const value = restaurant[rule.field];

    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push({
        index,
        name: restaurant.name || `第 ${index + 1} 筆`,
        field: rule.field,
        error: rule.errorMessage || `${rule.field} 為必填項`,
        severity: 'error',
      });
      return;
    }

    if (value !== undefined && value !== null && rule.validator && !rule.validator(value)) {
      errors.push({
        index,
        name: restaurant.name || `第 ${index + 1} 筆`,
        field: rule.field,
        error: rule.errorMessage || `${rule.field} 格式不正確`,
        severity: 'error',
      });
    }
  });

  return errors;
}

/**
 * 批次驗證店家資料
 */
export function batchValidate(restaurants: Partial<Restaurant>[]): ImportResult {
  const errors: ImportError[] = [];
  let successCount = 0;

  restaurants.forEach((restaurant, index) => {
    const validationErrors = validateRestaurant(restaurant, index);
    if (validationErrors.length === 0) {
      successCount++;
    } else {
      errors.push(...validationErrors);
    }
  });

  return {
    success: errors.filter((e) => e.severity === 'error').length === 0,
    totalCount: restaurants.length,
    successCount,
    failureCount: restaurants.length - successCount,
    errors,
    timestamp: new Date().toISOString(),
  };
}

/**
 * 生成驗證報告
 */
export function generateValidationReport(result: ImportResult): string {
  const lines: string[] = [
    '='.repeat(50),
    '批次匯入驗證報告',
    '='.repeat(50),
    `時間: ${new Date(result.timestamp).toLocaleString('zh-TW')}`,
    `總計: ${result.totalCount} 家店`,
    `成功: ${result.successCount} 家 (${((result.successCount / result.totalCount) * 100).toFixed(1)}%)`,
    `失敗: ${result.failureCount} 家 (${((result.failureCount / result.totalCount) * 100).toFixed(1)}%)`,
    '',
  ];

  if (result.errors.length > 0) {
    lines.push('錯誤詳情:');
    lines.push('-'.repeat(50));

    const errorsByIndex = new Map<number, ImportError[]>();
    result.errors.forEach((error) => {
      if (!errorsByIndex.has(error.index)) {
        errorsByIndex.set(error.index, []);
      }
      errorsByIndex.get(error.index)!.push(error);
    });

    errorsByIndex.forEach((errors, index) => {
      lines.push(`\n第 ${index + 1} 筆: ${errors[0].name}`);
      errors.forEach((error) => {
        lines.push(`  • [${error.severity.toUpperCase()}] ${error.field}: ${error.error}`);
      });
    });
  } else {
    lines.push('✓ 所有資料驗證通過！');
  }

  lines.push('');
  lines.push('='.repeat(50));

  return lines.join('\n');
}

/**
 * 導出驗證報告為 CSV
 */
export function exportValidationReportAsCSV(result: ImportResult): string {
  const headers = ['索引', '店名', '欄位', '錯誤信息', '嚴重程度'];
  const rows = result.errors.map((error) => [
    error.index + 1,
    error.name,
    error.field,
    error.error,
    error.severity,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
}

/**
 * 下載驗證報告
 */
export function downloadValidationReport(result: ImportResult, format: 'txt' | 'csv' = 'txt') {
  const content = format === 'txt' ? generateValidationReport(result) : exportValidationReportAsCSV(result);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `validation-report-${new Date().getTime()}.${format}`;
  link.click();
  URL.revokeObjectURL(link.href);
}
