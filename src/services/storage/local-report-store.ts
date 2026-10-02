import { AnalysisReport, BookingRequest, TeacherNote } from "@/types";

const LOCAL_STORAGE_KEY_REPORTS = "guanji_saved_reports_v1";
const LOCAL_STORAGE_KEY_BOOKINGS = "guanji_demo_bookings_v1";
const LOCAL_STORAGE_KEY_NOTES = "guanji_teacher_notes_v1";

/**
 * 本地存储服务（单设备，不上传云端，充分保护个人隐私）
 */
export const LocalReportStore = {
  // 获取本设备保存的所有报告
  getSavedReports(): AnalysisReport[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY_REPORTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to read local reports", e);
      return [];
    }
  },

  // 保存报告到本设备
  saveReport(report: AnalysisReport): boolean {
    if (typeof window === "undefined") return false;
    try {
      const existing = this.getSavedReports();
      // 若已存在则更新，若不存在则追加至最前
      const filtered = existing.filter((r) => r.id !== report.id);
      filtered.unshift(report);
      localStorage.setItem(LOCAL_STORAGE_KEY_REPORTS, JSON.stringify(filtered));
      return true;
    } catch (e) {
      console.error("Failed to save report to local storage", e);
      return false;
    }
  },

  // 检查某个报告是否已保存在当前设备
  isReportSaved(reportId: string): boolean {
    const list = this.getSavedReports();
    return list.some((r) => r.id === reportId);
  },

  // 从当前设备删除已保存的报告
  deleteReport(reportId: string): boolean {
    if (typeof window === "undefined") return false;
    try {
      const existing = this.getSavedReports();
      const filtered = existing.filter((r) => r.id !== reportId);
      localStorage.setItem(LOCAL_STORAGE_KEY_REPORTS, JSON.stringify(filtered));
      return true;
    } catch (e) {
      console.error("Failed to delete local report", e);
      return false;
    }
  },

  // 获取单个报告（优先从本地存储读取）
  getReportById(reportId: string): AnalysisReport | null {
    const list = this.getSavedReports();
    return list.find((r) => r.id === reportId) || null;
  },

  // --- 演示预约数据 ---
  getDemoBookings(): BookingRequest[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveDemoBooking(booking: BookingRequest): void {
    if (typeof window === "undefined") return;
    try {
      const list = this.getDemoBookings();
      list.unshift(booking);
      localStorage.setItem(LOCAL_STORAGE_KEY_BOOKINGS, JSON.stringify(list));
    } catch (e) {
      console.error("Failed to save demo booking", e);
    }
  },

  updateBookingStatus(bookingId: string, status: "pending_confirmation" | "confirmed" | "cancelled"): void {
    if (typeof window === "undefined") return;
    try {
      const list = this.getDemoBookings();
      const item = list.find((b) => b.id === bookingId);
      if (item) {
        item.status = status;
        localStorage.setItem(LOCAL_STORAGE_KEY_BOOKINGS, JSON.stringify(list));
      }
    } catch (e) {
      console.error("Failed to update booking status", e);
    }
  },

  // --- 老师笔记管理（私人笔记 vs 客户可见摘要） ---
  getTeacherNotes(): Record<string, TeacherNote> {
    if (typeof window === "undefined") return {};
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY_NOTES);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  saveTeacherNote(note: TeacherNote): void {
    if (typeof window === "undefined") return;
    try {
      const map = this.getTeacherNotes();
      map[note.bookingId] = note;
      localStorage.setItem(LOCAL_STORAGE_KEY_NOTES, JSON.stringify(map));
    } catch (e) {
      console.error("Failed to save teacher note", e);
    }
  },
};
