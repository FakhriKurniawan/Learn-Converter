import Mongoose from 'mongoose';
import { checkServerIdentity } from 'tls';

// Profil Pengguna
export const ProfileSchema = new Mongoose.Schema({
    title           :{type: String, minlength:3},
    firstName       :{type: String, required: true, minlength:3},
    lastName        :{type: String, required: true, minlength:3},
    genderType      :{type: String, required: true, minlength:1},
    maritalStatus   :{type: String, required: true, minlength:1},
    birthDate       :{type: Date},
    birthPlace      :{type: String}
},{
    timestamps:true
});

// Nomer Rekening Bank
export const BankSchema = new Mongoose.Schema({
    bankAccountNumber   :{type: String, required: true, minlength:1 },
    bankName            :{type: String, required: true, minlength:1 },
    // tabungan, giro etc
    bankAccountType     :{type: String, required: true, minlength:1 }
},{
    timestamps:true
});

// Alamat Pengguna
export const AddressSchema = new Mongoose.Schema({
    streetAddress       :{type: String, required: true, minlength:3 },
    city                :{type: String, minlength:4 },
    province            :{type: String},
    country             :{type: String},
    postalCode          :{type: String},
    // home, office
    addressType         :{type: String}
},{
    timestamps:true
});

// Departemen
export const DepartmentSchema = new Mongoose.Schema({
    departmentName              :{type: String, required: true},
    departmentDescription       :{type: String}
}, {
    timestamps: true
});

// Jabatan
export const JobPositionSchema = new Mongoose.Schema({
    jobPositionName             :{type: String, required: true},
    jobPositionDescription      :{type: String},
    reportTo                    :{type: Mongoose.Types.ObjectId},
    departement                 :{type: Mongoose.Types.ObjectId},
    // structural or functional
    positionType                :{type: String, required:true}   
},{
    timestamps: true
});


// Riwayat Penugasan
export const AssignmentSchema = new Mongoose.Schema({
    assignmentRefNumber     :{type: String, required: true, unique: true},
    assignmentDate          :{type: Date, required: true},
    assignToDepartment      :{type: Mongoose.Schema.ObjectId, required: true},
    // status penugasan - hanya satu status yang bersifat current
    assignmentStatus        :{type: String, required: true}
    
},{
    timestamps:true
});

// Status Kepegawaian       : [ Magang, Kontrak, Tetap] 
export const EmployementStatusSchema = new Mongoose.Schema({
    statusName              :{type: String, required: true}
},{
    timestamps: true
});

// Data Kepegawaian
export const EmployeeSchema = new Mongoose.Schema({
    employeeNumber          :{type: String, unique: true, required: true},
    assignmentHistory       :[AssignmentSchema]
},{
    timestamps: true
});

// Data User
export const UserSchema = new Mongoose.Schema({
    username        :{type: String, required: true, unique:true, minlength:10},
    email           :{type: String, required: true, unique:true, minlength:10},
    phone           :{type: String, required: true, unique:true, minlength:10},
    password        :{type: String, required: true, minlength:5},
    status          :{type: String, required: true, minlength:5},
    profile         :{type:ProfileSchema},
    banks           :[BankSchema],
    addresses       :[AddressSchema],
    employeeInfo    :{EmployeeSchema}
}, {
    timestamps:true
});

UserSchema.virtual('FirstName').get(()=>{ return this.profile.firstName });


// Data Product Category
export const ProductCategorySchema  = new Mongoose.Schema({
    categoryName        :{type: String, required: true, unique: true},
    categoryDescription :{type: String}
},{
    timestamps: true
});


// Data Product Type
export const ProductTypeSchema = new Mongoose.Schema({
    typeName            :{type: String, required: true, unique: true},
    typeDescription     :{type: String}
},{
    timestamps: true
});

// Data Pricing
export const ProductPricingSchema = new Mongoose.Schema({
    sellingPrice                :{type: Mongoose.Types.Decimal128},
    effectiveStart              :{type: Date},
    isActive                    :{type: Boolean}
},{
    timestamps: true
})

// Data Product
export const ProductSchema = new Mongoose.Schema({
    productSKU                  :{type: String, required: true, unique: true},
    productName                 :{type: String, required: true},
    productDescription          :{type: String},
    productCategory             :{type: ProductCategorySchema},
    productType                 :{type: ProductTypeSchema},
    pricings                    :[ProductPricingSchema]
},{
    timestamps: true
});
