/**
 * 自動化流程管理系統
 * 支援短網址解析、照片配對、批次匯入等自動化操作
 */

export interface AutomationTask {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  error?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  tasks: AutomationTask[];
  status: 'idle' | 'running' | 'completed' | 'failed';
  progress: number;
}

/**
 * 短網址解析器
 * 自動過濾無效 Google Maps 連結
 */
export async function parseShortUrl(shortUrl: string): Promise<string | null> {
  try {
    const response = await fetch(shortUrl, { method: 'HEAD', redirect: 'follow' });
    const finalUrl = response.url;

    // 驗證是否為有效的 Google Maps 連結
    if (finalUrl.includes('google.com/maps')) {
      return finalUrl;
    }

    return null;
  } catch (error) {
    console.error('短網址解析失敗:', error);
    return null;
  }
}

/**
 * 照片配對器
 * 自動選擇主圖，次要圖片打包
 */
export interface PhotoMatchResult {
  mainPhoto: string;
  secondaryPhotos: string[];
  confidence: number;
}

export async function matchPhotos(
  restaurantName: string,
  photos: string[]
): Promise<PhotoMatchResult> {
  // 簡單的照片評分邏輯
  // 實際應用中可以使用 AI 視覺識別
  const scoredPhotos = photos.map((photo, index) => ({
    photo,
    score: index === 0 ? 1.0 : 0.8 - index * 0.1, // 第一張照片優先
  }));

  scoredPhotos.sort((a, b) => b.score - a.score);

  return {
    mainPhoto: scoredPhotos[0].photo,
    secondaryPhotos: scoredPhotos.slice(1).map((p) => p.photo),
    confidence: scoredPhotos[0].score,
  };
}

/**
 * 工作流程執行器
 */
export class WorkflowExecutor {
  private workflow: AutomationWorkflow;

  constructor(name: string) {
    this.workflow = {
      id: `workflow-${Date.now()}`,
      name,
      tasks: [],
      status: 'idle',
      progress: 0,
    };
  }

  addTask(name: string, description: string): void {
    this.workflow.tasks.push({
      id: `task-${this.workflow.tasks.length}`,
      name,
      description,
      status: 'pending',
      progress: 0,
    });
  }

  async execute(
    taskHandlers: Record<string, () => Promise<void>>
  ): Promise<AutomationWorkflow> {
    this.workflow.status = 'running';

    for (let i = 0; i < this.workflow.tasks.length; i++) {
      const task = this.workflow.tasks[i];
      task.status = 'running';
      task.startTime = new Date();

      try {
        const handler = taskHandlers[task.id];
        if (handler) {
          await handler();
        }

        task.status = 'completed';
        task.progress = 100;
      } catch (error) {
        task.status = 'failed';
        task.error = error instanceof Error ? error.message : '未知錯誤';
        this.workflow.status = 'failed';
      }

      task.endTime = new Date();
      this.updateProgress();
    }

    if (this.workflow.status !== 'failed') {
      this.workflow.status = 'completed';
    }

    return this.workflow;
  }

  private updateProgress(): void {
    const completedTasks = this.workflow.tasks.filter((t) => t.status === 'completed').length;
    this.workflow.progress = (completedTasks / this.workflow.tasks.length) * 100;
  }

  getWorkflow(): AutomationWorkflow {
    return this.workflow;
  }
}

/**
 * 批次匯入協調器
 * 一次處理 20 家店
 */
export class BatchImportCoordinator {
  private batchSize = 20;
  private totalBatches = 0;
  private currentBatch = 0;

  setBatchSize(size: number): void {
    this.batchSize = size;
  }

  calculateBatches(totalItems: number): number {
    this.totalBatches = Math.ceil(totalItems / this.batchSize);
    return this.totalBatches;
  }

  getBatch<T>(items: T[], batchIndex: number): T[] {
    const start = batchIndex * this.batchSize;
    const end = Math.min(start + this.batchSize, items.length);
    return items.slice(start, end);
  }

  async processBatches<T>(
    items: T[],
    processor: (batch: T[], batchIndex: number) => Promise<void>
  ): Promise<void> {
    const batches = this.calculateBatches(items.length);

    for (let i = 0; i < batches; i++) {
      const batch = this.getBatch(items, i);
      this.currentBatch = i;
      await processor(batch, i);
    }
  }

  getProgress(): number {
    return (this.currentBatch / this.totalBatches) * 100;
  }
}

/**
 * 驗證報告生成器
 */
export interface ValidationStats {
  totalItems: number;
  validItems: number;
  invalidItems: number;
  validationRate: number;
  processingTime: number;
  timestamp: string;
}

export function generateValidationStats(
  totalItems: number,
  validItems: number,
  processingTime: number
): ValidationStats {
  return {
    totalItems,
    validItems,
    invalidItems: totalItems - validItems,
    validationRate: (validItems / totalItems) * 100,
    processingTime,
    timestamp: new Date().toISOString(),
  };
}
