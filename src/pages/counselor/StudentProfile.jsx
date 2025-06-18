import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import { formatDate } from '../../utils/functions';
import { useSchoolData } from "../../api/counselors/useGetSchoolStudents";



export default function StudentProfile() {
  const { id } = useParams();
  const { getStudentProfile, loading, error } = useSchoolData();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await getStudentProfile(id);
        setStudentData(response.data.data);
      } catch (err) {
        console.error('Error fetching student data:', err);
      }
    };

    fetchStudentData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error || !studentData) {
    return (
      <div className="text-red-600 p-4">
        {error || 'Failed to load student data'}
      </div>
    );
  }

  const { personalData, familyBackground, familyStructure, educationalBackground } = studentData;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link
        to="/counselor/students"
        className="text-primary hover:font-bold"
      >
        🔙Back
      </Link>
      <h1 className="text-md md:text-lg font-bold mb-6">
        Student Profile: {personalData?.firstName} {personalData?.lastName}
      </h1>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-medium">Admission Number:</span>{" "}
              {personalData?.admissionNumber}
            </p>
            <p>
              <span className="font-medium">Year of Admission:</span>{" "}
              {personalData?.yearOfAdmission}
            </p>
            <p>
              <span className="font-medium">Gender:</span>{" "}
              {personalData?.gender}
            </p>
            <p>
              <span className="font-medium">Date of Birth:</span>{" "}
              {formatDate(personalData?.dateOfBirth)}
            </p>
            <p>
              <span className="font-medium">Place of Birth:</span>{" "}
              {personalData?.placeOfBirth}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Nationality:</span>{" "}
              {personalData?.nationality}
            </p>
            <p>
              <span className="font-medium">State of Origin:</span>{" "}
              {personalData?.stateOfOrigin}
            </p>
            <p>
              <span className="font-medium">Religion:</span>{" "}
              {personalData?.religion}
            </p>
            <p>
              <span className="font-medium">Languages Spoken:</span>{" "}
              {personalData?.languagesSpoken}
            </p>
            <p>
              <span className="font-medium">Countries Visited:</span>{" "}
              {personalData?.countriesVisited}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-medium">Permanent Address:</span>{" "}
              {personalData?.address}
            </p>
            <p>
              <span className="font-medium">Contact Address:</span>{" "}
              {personalData?.contactAddress}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">College House:</span>{" "}
              {personalData?.collegeHouse}
            </p>
          </div>
        </div>
      </div>

      {/* Family Background */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Family Background</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Father's Information */}
          {familyBackground?.father && (
            <div>
              <h3 className="font-medium mb-2">Father's Information</h3>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {familyBackground.father.name}
              </p>
              <p>
                <span className="font-medium">Contact Address:</span>{" "}
                {familyBackground.father.contactAddress}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {familyBackground.father.phone}
              </p>
              <p>
                <span className="font-medium">Occupation:</span>{" "}
                {familyBackground.father.occupation}
              </p>
              <p>
                <span className="font-medium">Education Level:</span>{" "}
                {familyBackground.father.educationLevel}
              </p>
            </div>
          )}

          {/* Mother's Information */}
          {familyBackground?.mother && (
            <div>
              <h3 className="font-medium mb-2">Mother's Information</h3>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {familyBackground.mother.name}
              </p>
              <p>
                <span className="font-medium">Contact Address:</span>{" "}
                {familyBackground.mother.contactAddress}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {familyBackground.mother.phone}
              </p>
              <p>
                <span className="font-medium">Occupation:</span>{" "}
                {familyBackground.mother.occupation}
              </p>
              <p>
                <span className="font-medium">Education Level:</span>{" "}
                {familyBackground.mother.educationLevel}
              </p>
            </div>
          )}

          {/* Guardian's Information (if applicable) */}
          {familyBackground?.guardian && (
            <div>
              <h3 className="font-medium mb-2">Guardian's Information</h3>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {familyBackground.guardian.name}
              </p>
              <p>
                <span className="font-medium">Contact Address:</span>{" "}
                {familyBackground.guardian.contactAddress}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {familyBackground.guardian.phone}
              </p>
              <p>
                <span className="font-medium">Occupation:</span>{" "}
                {familyBackground.guardian.occupation}
              </p>
              <p>
                <span className="font-medium">Education Level:</span>{" "}
                {familyBackground.guardian.educationLevel}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Family Structure */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Family Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-medium">Father's Number of Wives:</span>{" "}
              {familyStructure?.fatherWives}
            </p>
            <p>
              <span className="font-medium">Mother's Position:</span>{" "}
              {familyStructure?.motherPosition}
            </p>
            <p>
              <span className="font-medium">Total Siblings:</span>{" "}
              {familyStructure?.totalSiblings}
            </p>
            <p>
              <span className="font-medium">Male Siblings:</span>{" "}
              {familyStructure?.maleSiblings}
            </p>
            <p>
              <span className="font-medium">Female Siblings:</span>{" "}
              {familyStructure?.femaleSiblings}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Position Among Siblings:</span>{" "}
              {familyStructure?.positionAmongSiblings}
            </p>
            <p>
              <span className="font-medium">Parents' Status:</span>{" "}
              {familyStructure?.parentsStatus}
            </p>
          </div>
        </div>
      </div>

      {/* Educational Background */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Educational Background</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary School */}
          {educationalBackground?.schools?.primary && (
            <div>
              <h3 className="font-medium mb-2">Primary School</h3>
              <p>
                <span className="font-medium">School Name:</span>{" "}
                {educationalBackground.schools.primary.schoolName}
              </p>
              <p>
                <span className="font-medium">Admission Year:</span>{" "}
                {educationalBackground.schools.primary.admissionYear}
              </p>
              <p>
                <span className="font-medium">Graduation Year:</span>{" "}
                {educationalBackground.schools.primary.graduationYear}
              </p>
              <p>
                <span className="font-medium">Certificate Number:</span>{" "}
                {educationalBackground.schools.primary.certificateNumber}
              </p>
            </div>
          )}

          {/* Junior Secondary School */}
          {educationalBackground?.schools?.juniorSecondary && (
            <div>
              <h3 className="font-medium mb-2">Junior Secondary School</h3>
              <p>
                <span className="font-medium">School Name:</span>{" "}
                {educationalBackground.schools.juniorSecondary.schoolName}
              </p>
              <p>
                <span className="font-medium">Admission Year:</span>{" "}
                {educationalBackground.schools.juniorSecondary.admissionYear}
              </p>
              <p>
                <span className="font-medium">Graduation Year:</span>{" "}
                {educationalBackground.schools.juniorSecondary.graduationYear}
              </p>
              <p>
                <span className="font-medium">Certificate Number:</span>{" "}
                {
                  educationalBackground.schools.juniorSecondary
                    .certificateNumber
                }
              </p>
            </div>
          )}

          {/* Senior Secondary School */}
          {educationalBackground?.schools?.seniorSecondary && (
            <div>
              <h3 className="font-medium mb-2">Senior Secondary School</h3>
              <p>
                <span className="font-medium">School Name:</span>{" "}
                {educationalBackground.schools.seniorSecondary.schoolName}
              </p>
              <p>
                <span className="font-medium">Admission Year:</span>{" "}
                {educationalBackground.schools.seniorSecondary.admissionYear}
              </p>
              <p>
                <span className="font-medium">Graduation Year:</span>{" "}
                {educationalBackground.schools.seniorSecondary.graduationYear}
              </p>
              <p>
                <span className="font-medium">Certificate Number:</span>{" "}
                {
                  educationalBackground.schools.seniorSecondary
                    .certificateNumber
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 