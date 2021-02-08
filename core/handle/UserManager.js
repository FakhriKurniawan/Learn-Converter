import Mongoose from 'mongoose';
import { User } from '../../models/models/User';

export default class UserManager {

    async RegisterNewUser(userdata) {
        try 
        {
            // populate user profile 
            let newUserProfile = {
                title                   : userdata.title,
                firstName               : userdata.firstName,
                lastName                : userdata.lastName,
                genderType              : userdata.genderType,
                maritalStatus           : userdata.maritalStatus,
                birthDate               : userdata.birthDate,
                birthPlace              : userdata.birthPlace
            }

            // populate user bank account
            let banks = [];
            for(var indeks in userdata.banks)
            {
                let item = userdata.banks[indeks];
                let newUserBankAccount  = {
                    bankAccountNumber   : item.bankAccountNumber,
                    bankName            : item.bankName,
                    bankAccountType     : item.bankAccountType
                }
                banks.push(newUserBankAccount);

            }

            let addresses = [];
            for(var indeks in userdata.addresses) {
                let item = userdata.addresses[indeks];
                let newUseraddress = {
                    streetAddress       : item.streetAddress,
                    city                : item.city,
                    province            : item.province,
                    country             : item.country,
                    postalCode          : item.postalCode,
                    addressType         : item.addressType
                }
                addresses.push(newUseraddress);
            }

            // let assignmentHistory = [];
            // for(var item in userdata.employeeInfo.assignments)
            // {
            //     let newAssigmentHistory = {

            //     }
            // }

            // let newEmployeeInfo = {
            //         employeeNumber      : userdata.employeeInfo.employeeNumber,
            //         assignmentHistory   :[AssignmentSchema]
            // }

            // populate user data
            let newUserData = {
                    username            : userdata.username,
                    email               : userdata.email,
                    phone               : userdata.phone,
                    password            : userdata.password,
                    status              : 'pending',
                    profile             : newUserProfile,
                    banks               : banks,
                    addresses           : addresses,
                    // employeeInfo        :{EmployeeSchema}
                    /*
                    */
            };

            
        
            // save this user data - asynchronously
            let user = await new User(newUserData).save();
        }
        catch (error) {
            console.log(error)
        }

    }

     async ListUser(callback) {
        return  await User.find().select('_id username email phone password banks');
    }


}