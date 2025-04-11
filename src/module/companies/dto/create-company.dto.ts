export class CreateCompanyDto {
  name: string;
  authorizedPerson: string;
  designation: string;
  address: string;
  email: string;
  contactNo: string;
  gstNo: string;
  packageId?: string;
  language?: string; // नया पैरामीटर: 'en' या 'hi'
}