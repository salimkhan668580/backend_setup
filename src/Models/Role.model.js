import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  roleName: String,

  permissions:{
    dashboard:{ fullAccess:Boolean, readAccess:Boolean },
    bookingManagement:{ fullAccess:Boolean, readAccess:Boolean },
    paymentManagement:{ fullAccess:Boolean, readAccess:Boolean },
    reportsPage:{ fullAccess:Boolean, readAccess:Boolean },
    auditLogs:{ fullAccess:Boolean, readAccess:Boolean }
  }
});

const Role = mongoose.model('Role', RoleSchema);

export default Role;