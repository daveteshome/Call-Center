import React from "react";
import Index from "../views/dashboard/index";
import { Switch, Route } from "react-router-dom";

//added routes for dashboard
import AddStatus from "../components/AddStatus";
import AllLeads from "../components/AllLeads";
import AllLeadsRejected from "../components/AllLeadsRejected";



import LeadView from "../components/LeadView";
import FollowUp from "../components/FollowUp";
import Appointments from "../components/Appointments";
import StatusReview from "../components/StatusReview";
import AddLeads from "../components/AddLeads";

// user
import UserProfile from "../views/dashboard/app/user-profile";
import UserAdd from "../views/dashboard/app/user-add";
import ItemAdd from "../views/dashboard/app/item-add";
import UserList from "../views/dashboard/app/user-list";
import ItemList from "../views/dashboard/app/item-list";
import DeliveryList from "../views/dashboard/app/delivery-list";
import DeliveryAdd from "../views/dashboard/app/delivery-add";
import DriverAdd from "../views/dashboard/app/driver-add";
import AdminAdd from "../views/dashboard/app/admin-add";
import userProfileEdit from "../views/dashboard/app/user-privacy-setting";
import UpdatedLeads from "../components/updatedLeads";
// widget
import Widgetbasic from "../views/dashboard/widget/widgetbasic";
import Widgetcard from "../views/dashboard/widget/widgetcard";
import Widgetchart from "../views/dashboard/widget/widgetchart";
// icon
import Solid from "../views/dashboard/icons/solid";
import Outline from "../views/dashboard/icons/outline";
import DualTone from "../views/dashboard/icons/dual-tone";
// Form
import FormElement from "../views/dashboard/from/form-element";
import FormValidation from "../views/dashboard/from/form-validation";
import FormWizard from "../views/dashboard/from/form-wizard";
// table
import BootstrapTable from "../views/dashboard/table/bootstrap-table";
import TableData from "../views/dashboard/table/table-data";

// map
import Vector from "../views/dashboard/maps/vector";
import Google from "../views/dashboard/maps/google";
import ProductMap from "../views/dashboard/maps/productMap";
import TodayMap from "../views/dashboard/maps/todayMap";
import ChnagePasswordDashboard from "../views/dashboard/app/changepassword";
//extra
import PrivacyPolicy from "../views/dashboard/extra/privacy-policy";
import TermsofService from "../views/dashboard/extra/terms-of-service";

//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
//Special Pages
import Billing from "../views/dashboard/special-pages/billing";
import Kanban from "../views/dashboard/special-pages/kanban";
import Pricing from "../views/dashboard/special-pages/pricing";
import Timeline from "../views/dashboard/special-pages/timeline";
import Calender from "../views/dashboard/special-pages/calender";
//admin
import Admin from "../views/dashboard/admin/admin";
import Completed from "../views/dashboard/app/Completed";
import Pending from "../views/dashboard/app/Pending";
import Requests from "../views/dashboard/app/Requests";

import ConfirmMail from "../views/dashboard/auth/confirm-mail";
import Reset from "../views/dashboard/auth/reset";
import ItemList2 from "../views/dashboard/app/admin-list";
import AddSalesRep from "../views/dashboard/app/AddSalesRep";
import EditProfile from "../views/dashboard/app/EditProfile";
import SalesRepPerformance from "../components/SalesRepPerformance";
import DailyReport from "../components/DailyReport";
import ReportsHistory from "../components/ReportsHistory";

const DefaultRouter = () => {
  return (
    <TransitionGroup>
      <CSSTransition classNames="fadein" timeout={300}>
        <Switch>
          <Route path="/dashboard" exact component={Index} />
          {/* user */}
          <Route path="/auth/confirm-email" exact component={ConfirmMail} />
          <Route path="/auth/reset" exact component={Reset} />
          <Route
            path="/dashboard/app/user-profile"
            exact
            component={UserProfile}
          />
          <Route path="/dashboard/app/driver-add" exact component={DriverAdd} />
          <Route path="/dashboard/app/admin-add" exact component={AdminAdd} />

          <Route path="/dashboard/app/add-status" exact component={AddStatus} />
          <Route path="/dashboard/app/add-leads" exact component={AddLeads} />

          <Route path="/dashboard/app/all-leads" exact component={AllLeads} />
          <Route path="/dashboard/app/AllLeadsRejected" exact component={AllLeadsRejected} />

          
          <Route
            path="/dashboard/app/updated-leads"
            exact
            component={UpdatedLeads}
          />
          <Route
            path="/dashboard/app/reports-history"
            exact
            component={ReportsHistory}
          />
          <Route
            path="/dashboard/app/daily-report"
            exact
            component={DailyReport}
          />
          <Route path="/dashboard/app/leads/:id" component={LeadView} />
          <Route path="/dashboard/app/follow-up" component={FollowUp} />
          <Route path="/dashboard/app/appointments" component={Appointments} />
          <Route path="/dashboard/app/status-review" component={StatusReview} />
          <Route path="/dashboard/app/add-sales-rep" component={AddSalesRep} />
          <Route path="/dashboard/app/update-profile" component={EditProfile} />
          <Route
            path="/dashboard/app/sales-rep-performance"
            component={SalesRepPerformance}
          />

          <Route path="/dashboard/app/item-add" exact component={ItemAdd} />
          <Route path="/dashboard/app/item-list" exact component={ItemList} />
          <Route path="/dashboard/app/item-list" exact component={ItemList} />

          <Route path="/dashboard/app/user-list" exact component={UserList} />
          <Route
            path="/dashboard/app/change-password"
            exact
            component={ChnagePasswordDashboard}
          />

          <Route
            path="/dashboard/app/user-privacy-setting"
            exact
            component={userProfileEdit}
          />
          {/* widget */}
          <Route
            path="/dashboard/widget/widgetbasic"
            exact
            component={Widgetbasic}
          />
          <Route
            path="/dashboard/widget/widgetcard"
            exact
            component={Widgetcard}
          />
          <Route
            path="/dashboard/widget/widgetchart"
            exact
            component={Widgetchart}
          />
          {/* icon */}
          <Route path="/dashboard/icon/solid" exact component={Solid} />
          <Route path="/dashboard/icon/outline" exact component={Outline} />
          <Route path="/dashboard/icon/dual-tone" exact component={DualTone} />
          {/* From */}

          <Route
            path="/dashboard/app/adminregistration"
            exact
            component={AdminAdd}
          />
          <Route path="/dashboard/app/adminlist" exact component={ItemList2} />
          <Route
            path="/dashboard/form/form-element"
            exact
            component={ItemList}
          />
          <Route
            path="/dashboard/form/form-validation"
            exact
            component={FormValidation}
          />
          <Route
            path="/dashboard/form/form-wizard"
            exact
            component={FormWizard}
          />
          {/* table */}
          <Route
            path="/dashboard/table/bootstrap-table"
            exact
            component={BootstrapTable}
          />
          <Route
            path="/dashboard/table/table-data"
            exact
            component={TableData}
          />
          {/*special pages */}
          <Route path="/dashboard/requests" exact component={Requests} />
          <Route path="/dashboard/deliveryAdd" exact component={DeliveryAdd} />
          <Route
            path="/dashboard/deliveryList"
            exact
            component={DeliveryList}
          />
          <Route path="/dashboard/pending" exact component={Pending} />
          <Route path="/dashboard/completed" exact component={Completed} />
          <Route
            path="/dashboard/special-pages/kanban"
            exact
            component={Requests}
          />
          <Route
            path="/dashboard/special-pages/pricing"
            exact
            component={Pricing}
          />
          <Route
            path="/dashboard/special-pages/timeline"
            exact
            component={Timeline}
          />
          <Route
            path="/dashboard/special-pages/calender"
            exact
            component={Calender}
          />
          {/* map */}
          <Route path="/dashboard/map/vector" exact component={Vector} />
          <Route path="/dashboard/map/google" exact component={Google} />
          <Route path="/dashboard/map/products" exact component={ProductMap} />
          <Route path="/dashboard/map/today" exact component={TodayMap} />
          {/* extra */}
          <Route
            path="/dashboard/extra/privacy-policy"
            exact
            component={PrivacyPolicy}
          />
          <Route
            path="/dashboard/extra/terms-of-service"
            exact
            component={TermsofService}
          />
          {/*admin*/}
          <Route path="/dashboard/admin/admin" exact component={Admin} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default DefaultRouter;
