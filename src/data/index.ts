/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MonitorCog,
  ClipboardPen,
  Activity,
  Server,
  School,
  LayoutDashboard,
  Library,
  CircleHelp,
  Calendar,
} from "lucide-react";

interface SubOption {
  label: string;
  path: string;
  children?: SubOption[];
}

interface NavItem {
  icon: any;
  label: string;
  path: string;
  hasDropdown: boolean;
  dropdownOptions?: SubOption[];
}

const navItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
    hasDropdown: false,
  },
  {
    icon: MonitorCog,
    label: "Configuration",
    path: "/configuration",
    hasDropdown: true,
    dropdownOptions: [
      {
        label: "Institute Setup",
        path: "/configuration/institute-setup",
        children: [
          {
            label: "Institute Profile",
            path: "/configuration/institute-setup/profile"
          },
          {
            label: "Section Timing Details",
            path: "/configuration/institute-setup/section-timing-details"
          }
        ]
      },
      {
        label: "CCTV Camera",
        path: "/configuration/cctv",
        children: [
          {
            label: "DVR Configuration",
            path: "/configuration/cctv/dvr"
          },
          {
            label: "Camera List", 
            path: "/configuration/cctv/camera-list"
          },
          {
            label: "Allocate Camera",
            path: "/configuration/cctv/allocate"
          }
        ]
      },
      {
        label: "Teaching",
        path: "/configuration/teaching",
        children: [
          {
            label: "Allocate Teacher",
            path: "/configuration/teaching/allocate-teacher"
          },
          {
            label: "Allocate RollNumber",
            path: "/configuration/teaching/allocate-rollnumber"
          },
          {
            label: "Student Timetable",
            path: "/configuration/teaching/student-timetable"
          },
          {
            label: "Teacher Timetable",
            path: "/configuration/teaching/teacher-timetable"
          },
          {
            label: "Proxy Teacher Master",
            path: "/configuration/teaching/proxy-teacher"
          }
        ]
      },
      {
        label: "Admin",
        path: "/configuration/admin",
        children: [
          {
            label: "Role Master",
            path: "/configuration/admin/role-master"
          }
        ]
      },
      {
        label: "Exam Configuration",
        path: "/configuration/exam",
        children: [
          {
            label: "Exam Schedule",
            path: "/configuration/exam/schedule"
          },
          {
            label: "Test Type Configuration",
            path: "/configuration/exam/test-type"
          },
          {
            label: "Grading Structure Master",
            path: "/configuration/exam/grading-structure"
          },
          {
            label: "Final Report Card Configuration",
            path: "/configuration/exam/report-card"
          },
          {
            label: "Question Paper Master",
            path: "/configuration/exam/question-paper"
          },
          {
            label: "Test Taken",
            path: "/configuration/exam/test-taken"
          },
          {
            label: "Generate Result",
            path: "/configuration/exam/generate-result"
          },
          {
            label: "Teacher Remark Master",
            path: "/configuration/exam/teacher-remark-master"
          }
        ]
      },
      {
        label: "Accounts",
        path: "/configuration/accounts",
        children: [
          {
            label: "Account Head",
            path: "/configuration/accounts/account-head"
          },
          {
            label: "Ledger Head",
            path: "/configuration/accounts/ledger-head"
          },
          {
            label: "Assets Category Master",
            path: "/configuration/accounts/assets-category"
          },
          {
            label: "Assets Master",
            path: "/configuration/accounts/assets-master"
          },
          {
            label: "FinLedger",
            path: "/configuration/accounts/fin-ledger"
          }
        ]
      }
    ]
  },
  {
    icon: Server,
    label: "Masters",
    path: "/masters",
    hasDropdown: true,
    dropdownOptions: [
      {
        label: "Form Creation",
        path: "/masters/form-creation",
        children: [
          {
            label: "Dynamic Form Master",
            path: "/masters/form-creation/dynamic-form"
          }
        ]
      },
      {
        label: "Employee Master",
        path: "/masters/employee",
        children: [
          {
            label: "Employee Section",
            path: "/masters/employee/section"
          }
        ]
      },
      {
        label: "Activity Remark Master",
        path: "/masters/activity-remark"
      },
      {
        label: "Activity Master",
        path: "/masters/activity"
      },
      {
        label: "Bus",
        path: "/masters/bus",
        children: [
          {
            label: "Bus Master",
            path: "/masters/bus/bus-master"
          },
          {
            label: "Bus Stop Master",
            path: "/masters/bus/stop-master"
          },
          {
            label: "Bus Route Master",
            path: "/masters/bus/route-master"
          },
          {
            label: "Assign User To Bus",
            path: "/masters/bus/assign-user"
          }
        ]
      },
      {
        label: "Library",
        path: "/masters/library",
        children: [
          {
            label: "Book Rack Management",
            path: "/masters/library/book-rack"
          },
          {
            label: "Book Category Management",
            path: "/masters/library/book-category"
          },
          {
            label: "Book Sub-Category Management",
            path: "/masters/library/book-subcategory"
          },
          {
            label: "Book Management",
            path: "/masters/library/book-management"
          }
        ]
      },
      {
        label: "Institute",
        path: "/masters/institute",
        children: [
          {
            label: "Student Promotion Year",
            path: "/masters/institute/student-promotion"
          },
          {
            label: "Assign Student Class Batchwise",
            path: "/masters/institute/assign-class"
          }
        ]
      },
      {
        label: "Template",
        path: "/masters/template",
        children: [
          {
            label: "Assign Question To Feedback",
            path: "/masters/template/assign-feedback-question"
          },
          {
            label: "Feedback Master",
            path: "/masters/template/feedback-master"
          },
          {
            label: "Feedback Question Paper Master",
            path: "/masters/template/feedback-question-paper"
          },
          {
            label: "Feedback Question Bank Master",
            path: "/masters/template/feedback-question-bank"
          },
          {
            label: "Feedback Question",
            path: "/masters/template/feedback-question"
          },
          {
            label: "Notification Template Master",
            path: "/masters/template/notification-template"
          },
          {
            label: "Discussion/Manage Group",
            path: "/masters/template/discussion-group"
          },
          {
            label: "Task Template",
            path: "/masters/template/task-template"
          },
          {
            label: "Task Checklist",
            path: "/masters/template/task-checklist"
          },
          {
            label: "Email Details Master",
            path: "/masters/template/email-details"
          },
          {
            label: "SMS Setting Master",
            path: "/masters/template/sms-setting"
          },
          {
            label: "SMS Template Master",
            path: "/masters/template/sms-template"
          }
        ]
      }
    ]
  },
  {
    icon: Activity,
    label: "Daily Activities",
    path: "/daily-activities",
    hasDropdown: true,
    dropdownOptions: [
      {
        label: "Transactions",
        path: "/daily-activities/transactions",
        children: [
          {
            label: "Book Issue",
            path: "/daily-activities/transactions/book-issue"
          },
          {
            label: "Book Return",
            path: "/daily-activities/transactions/book-return"
          },
          {
            label: "Block Book Slot",
            path: "/daily-activities/transactions/block-book-slot"
          },
          {
            label: "Enroll Library Member",
            path: "/daily-activities/transactions/enroll-library-member"
          },
          {
            label: "Library Fees Collection",
            path: "/daily-activities/transactions/library-fees"
          },
          {
            label: "Library Members Attendance",
            path: "/daily-activities/transactions/library-attendance"
          },
          {
            label: "Send Renewal Reminder",
            path: "/daily-activities/transactions/renewal-reminder"
          },
          {
            label: "Book Return Reminder",
            path: "/daily-activities/transactions/book-return-reminder"
          },
          {
            label: "Lost Book Entry",
            path: "/daily-activities/transactions/lost-book-entry"
          }
        ]
      },
      {
        label: "Library Inventory Management",
        path: "/daily-activities/library-inventory"
      }
    ]
  },
  {
    icon: ClipboardPen,
    label: "Reports",
    path: "/reports",
    hasDropdown: true,
    dropdownOptions: [
      {
        label: "Assets Report",
        path: "/reports/assets"
      },
      {
        label: "Material Report",
        path: "/reports/material"
      },
      {
        label: "Library Reports",
        path: "/reports/library",
        children: [
          {
            label: "Books Issued Report",
            path: "/reports/library/books-issued"
          },
          {
            label: "Book Available Report",
            path: "/reports/library/books-available"
          },
          {
            label: "Bookwise Transaction Report",
            path: "/reports/library/bookwise-transactions"
          },
          {
            label: "Print Book QR Code",
            path: "/reports/library/print-book-qr"
          },
          {
            label: "Expired Member Report",
            path: "/reports/library/expired-members"
          }
        ]
      },
      {
        label: "Library Extra Features",
        path: "/reports/library-extra",
        children: [
          {
            label: "Notification And Alert",
            path: "/reports/library-extra/notifications"
          },
          {
            label: "Book Reservation",
            path: "/reports/library-extra/book-reservation"
          },
          {
            label: "Mobile Integration",
            path: "/reports/library-extra/mobile-integration"
          }
        ]
      }
    ]
  },
  {
    icon: School,
    label: "Classroom",
    path: "/classroom",
    hasDropdown: false,
  },
  {
    icon: Library,
    label: "Library Feedback",
    path: "/library-feedback",
    hasDropdown: false,
  },
  {
    icon: Calendar,
    label: "Calendar",
    path: "/calendar",
    hasDropdown: false,
  },
  {
    icon: CircleHelp,
    label: "Inquiry",
    path: "/inquiry",
    hasDropdown: false,
  }
];

export { navItems };
export type { NavItem, SubOption };