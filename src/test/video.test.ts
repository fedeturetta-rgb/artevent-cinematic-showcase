import { describe, expect, it } from "vitest";

import { getVideoEmbedUrl, isEmbeddableVideoUrl } from "@/lib/video";

describe("video helpers", () => {
  it("detects embeddable providers including Google Drive", () => {
    expect(isEmbeddableVideoUrl("https://www.youtube.com/watch?v=abc123")).toBe(true);
    expect(isEmbeddableVideoUrl("https://vimeo.com/123456")).toBe(true);
    expect(
      isEmbeddableVideoUrl("https://drive.google.com/file/d/1txr3GK9RK6-8h_SVGQV1Llt5DIZPR5KA/view?usp=share_link"),
    ).toBe(true);
    expect(isEmbeddableVideoUrl("/videos/local-file.mp4")).toBe(false);
  });

  it("converts Google Drive share links into preview embeds", () => {
    expect(
      getVideoEmbedUrl("https://drive.google.com/file/d/1txr3GK9RK6-8h_SVGQV1Llt5DIZPR5KA/view?usp=share_link"),
    ).toBe("https://drive.google.com/file/d/1txr3GK9RK6-8h_SVGQV1Llt5DIZPR5KA/preview");
  });

  it("preserves non-Google Drive URLs", () => {
    const vimeoUrl = "https://player.vimeo.com/video/555333111";

    expect(getVideoEmbedUrl(vimeoUrl)).toBe(vimeoUrl);
  });
});