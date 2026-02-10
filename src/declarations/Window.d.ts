declare global {
  interface Navigator {
    ink: {
      requestPresenter(options?: InkPresenterOptions): Promise<InkPresenter>;
    };
  }

  interface InkPresenterOptions {
    presentationArea?: HTMLElement;
  }

  interface InkPresenter {
    updateInkTrailStartPoint(event: PointerEvent, style: InkTrailStyle): void;
    drawingSessionWithRenderingContext(
      renderingContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
    ): Promise<InkDrawingSession>;
  }

  interface InkTrailStyle {
    color?: string;
    diameter?: number;
  }

  interface InkDrawingSession {
    updateInkTrailStartPoint(event: PointerEvent, style: InkTrailStyle): void;
    addListener(type: string, listener: EventListener): void;
    removeListener(type: string, listener: EventListener): void;
  }
}

export {};