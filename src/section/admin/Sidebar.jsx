import React, { useState } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import {
  AlignVerticalJustifyEnd,
  Contact,
  Gem,
  Layers,
  Speech,
  TableProperties,
  Users,
  Users2,
  Layers2,
  GraduationCap,
  Settings,
  Settings2,
  UserCheck,
  UserCog,
  FileCog,
  MessageCircleIcon,
  Tag,
} from "lucide-react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaSteam } from "react-icons/fa";
import {
  FaRegNewspaper,
  FaRegQuestionCircle,
  FaRegMoneyBillAlt,
  FaRegFileAlt,
  FaRegSmile,
  FaRegIdCard,
  FaRegListAlt,
  FaRegCaretSquareUp,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../customCompo/Navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    id: 1,
    icon: MdOutlineDashboardCustomize,
    current: false,
  },
  {
    name: "Users",
    href: "#",
    id: 2,
    icon: Contact,
    current: true,
    submenu: [
      // {
      //   name: "Admins",
      //   href: "/admin/admins",
      //   icon: UserCog,
      //   current: false,
      // },
      // {
      //   name: "Clients's",
      //   href: "/admin/clients",
      //   icon: UserCog,
      //   current: false,
      // },
      {
        name: "My Referral",
        href: "/admin/my-referral",
        icon: UserCog,
        current: false,
      },
    ],
  },
  // {
  //   name: "KYC Management",
  //   href: "#",
  //   id: 3,
  //   icon: FaRegIdCard,
  //   current: false,
  //   submenu: [
  //     {
  //       name: "KYC Pending",
  //       href: "/admin/kyc/pending",
  //       icon: FaRegIdCard,
  //       current: false,
  //     },
  //     {
  //       name: "KYC Verify",
  //       href: "/admin/kyc/verify",
  //       icon: FaRegIdCard,
  //       current: false,
  //     },
  //   ],
  // },

  {
    name: "Profile",
    href: "/admin/profile",
    id: 4,
    icon: MdOutlineDashboardCustomize,
    current: false,
  },

  {
    name: "Documents",
    href: "#",
    id: 5,
    icon: Layers,
    current: false,
    submenu: [
      {
        name: "Send Documents ",
        href: "/admin/send-documents",
        icon: FaRegListAlt,
        current: false,
      }
    ],
  },

  // {
  //   name: "Reports",
  //   href: "#",
  //   id: 6,
  //   icon: Layers,
  //   current: false,
  //   submenu: [
  //     {
  //       name: "Course Enrollment ",
  //       href: "/admin/send-documents",
  //       icon: FaRegListAlt,
  //       current: false,
  //     },
  //     {
  //       name: "Transactions List",
  //       href: "/admin/reports/transactions-list",
  //       icon: FaRegListAlt,
  //       current: false,
  //     },
  //   ],
  // },
  // {
  //   name: "Payout",
  //   href: "#",
  //   id: 11,
  //   icon: FaRegMoneyBillAlt,
  //   current: false,
  //   submenu: [
  //     {
  //       name: "Withdraw Request Lists",
  //       href: "/admin/payouts/withdraw-request-lists",
  //       icon: FaRegListAlt,
  //       current: false,
  //     },
  //   ],
  // },

  // {
  //   name: "FAQ",
  //   href: "/admin/faq",
  //   icon: FaRegQuestionCircle,
  //   current: false,
  //   id: 7,
  // },
  // {
  //   name: "Coupon",
  //   href: "/admin/coupon",
  //   icon: Layers,
  //   current: false,
  //   id: 8,
  // },
  // {
  //   name: "Subscription Lists",
  //   href: "/admin/subscriptions",
  //   icon: UserCheck,
  //   current: false,
  //   id: 18,
  // },
  // {
  //   name: "Settings",
  //   href: "#",
  //   id: 10,
  //   icon: Settings,
  //   current: false,
  //   submenu: [
  //     {
  //       name: "Payout Settings",
  //       href: "/admin/settings/payout-settings",
  //       icon: Settings2,
  //       current: false,
  //     },
  //     {
  //       name: "Payment Credentials",
  //       href: "/admin/settings/payment-credentials",
  //       icon: Settings2,
  //       current: false,
  //     },
  //     {
  //       name: "Auth Credentials",
  //       href: "/admin/settings/auth-credentials",
  //       icon: Settings2,
  //       current: false,
  //     },
  //     {
  //       name: "Live Class Settings",
  //       href: "/admin/settings/live-class-settings",
  //       icon: Settings2,
  //       current: false,
  //     },
  //     {
  //       name: "SMTP Settings",
  //       href: "/admin/settings/smtp-settings",
  //       icon: Settings2,
  //       current: false,
  //     },
  //     {
  //       name: "Site Settings",
  //       href: "/admin/settings/site-settings",
  //       icon: Settings2,
  //       current: false,
  //     },
  //     {
  //       name: "Landing Page",
  //       href: "/admin/settings/landing-page",
  //       icon: Settings2,
  //       current: false,
  //     },
  //     {
  //       name: "Privacy Policy and Terms",
  //       href: "/admin/settings/privacy-policy-terms",
  //       icon: Settings2,
  //       current: false,
  //     },
  //   ],
  // },
];

const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ sidebarOpen, setSidebarOpen,userData }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState(1);

  const handleNavmenu = (item) => {
    if (item.id === activeMenuItem) {
      setActiveMenuItem(0);
      navigate(item.href);
      setSidebarOpen(false);
      return;
    }
    setActiveMenuItem(item.id);
    navigate(item.href);

    if (!item?.submenu || item?.submenu?.length === 0) {
      setSidebarOpen(false);
    }
  };

  const handleSubmenu = (item) => {
    console.log("item", item);
    if (!item.href) {
      return;
    }
    navigate(item.href);
    setSidebarOpen(false);
  };

  return (
    <>
      <MobileSidebar
      userData={userData}
        navigation={navigation}
        classNames={classNames}
        teams={teams}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        handleNavmenu={handleNavmenu}
        activeMenuItem={activeMenuItem}
        handleSubmenu={handleSubmenu}
        pathName={pathname}
      />

      <DesktopSidebar
      userData={userData}
        navigation={navigation}
        classNames={classNames}
        teams={teams}
        handleNavmenu={handleNavmenu}
        activeMenuItem={activeMenuItem}
        handleSubmenu={handleSubmenu}
        pathName={pathname}
      />
      {/* <Navigation/> */}
    </>
  );
};

export default Sidebar;
