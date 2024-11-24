// import { useState, useEffect, useContext } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Pen, X, Check } from "lucide-react"
// import { AppContext } from '@/context/AppContext'

// export default function ContactInfo() {
//   const [userInfo, setUserInfo] = useState(null)
//   const [isEditingAccount, setIsEditingAccount] = useState(false)
//   const [isEditingLocation, setIsEditingLocation] = useState(false)
//   const [editedInfo, setEditedInfo] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const { auth } = useContext(AppContext);
//   const { token } = auth;

//   useEffect(() => {
//     fetchUserInfo()
//   }, [])

//   const fetchUserInfo = async () => {
//     setIsLoading(true)
//     try {
//       const response = await fetch('http://localhost:5000/api/v1/settings/profile',{
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//       })
//       const data = await response.json()
//       await new Promise((res) => setTimeout(res,2000))

//       setUserInfo(data.data)
//       setEditedInfo(data.data)
//     } catch (error) {
//       console.error('Error fetching user info:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleEdit = (section) => {
//     if (section === 'account') {
//       setIsEditingAccount(true)
//     } else if (section === 'location') {
//       setIsEditingLocation(true)
//     }
//   }

//   const handleCancel = (section) => {
//     setEditedInfo(userInfo)
//     if (section === 'account') {
//       setIsEditingAccount(false)
//     } else if (section === 'location') {
//       setIsEditingLocation(false)
//     }
//   }

//   const handleSave = async (section) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/v1/settings/profile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           full_name: `${editedInfo.first_name} ${editedInfo.last_name}`,
//           first_name: editedInfo.first_name,
//           last_name: editedInfo.last_name,
//           phone: editedInfo.phone,
//           company_name: editedInfo.company_name,
//           location: editedInfo.location,
//         }),
//       })
//       if (response.ok) {
//         setUserInfo(editedInfo)
//         if (section === 'account') {
//           setIsEditingAccount(false)
//         } else if (section === 'location') {
//           setIsEditingLocation(false)
//         }
//       } else {
//         console.error('Error updating user info')
//       }
//     } catch (error) {
//       console.error('Error updating user info:', error)
//     }
//   }

//   const handleChange = (e) => {
//     setEditedInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' }
//     return new Date(dateString).toLocaleDateString(undefined, options)
//   }

//   const SkeletonField = () => (
//     <div className="space-y-2">
//       <Skeleton className="h-4 w-[100px]" />
//       <Skeleton className="h-6 w-full" />
//     </div>
//   )

//   return (
//     <div className="min-h-screen  p-8">
//       <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact info</h1>
//       <Card className="mb-4 shadow-md">
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-xl font-normal">Account</CardTitle>
//           {!isLoading && !isEditingAccount && (
//             <Button variant="ghost" size="icon" onClick={() => handleEdit('account')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
//               <Pen className="h-4 w-4" />
//               <span className="sr-only">Edit account</span>
//             </Button>
//           )}
//           {isEditingAccount && (
//             <div className="flex space-x-2">
//               <Button variant="ghost" size="icon" onClick={() => handleCancel('account')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
//                 <X className="h-4 w-4" />
//                 <span className="sr-only">Cancel edit</span>
//               </Button>
//               <Button variant="ghost" size="icon" onClick={() => handleSave('account')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
//                 <Check className="h-4 w-4" />
//                 <span className="sr-only">Save changes</span>
//               </Button>
//             </div>
//           )}
//         </CardHeader>
//         <CardContent className="pt-0">
//           <div className="space-y-4">
//             {isLoading ? (
//               <>
//                 <SkeletonField />
//                 <SkeletonField />
//                 <SkeletonField />
//                 <SkeletonField />
//               </>
//             ) : (
//               <>
//                 <div>
//                   <Label htmlFor="profileId" className="mb-1 text-sm text-gray-500">User ID</Label>
//                   <p className="text-gray-700 ml-6">{userInfo?.profileId}</p>
//                 </div>
//                 <div>
//                   <Label htmlFor="name" className="text-sm text-gray-500">{!isEditingAccount && "Full Name"}</Label>
//                   {isEditingAccount ? (
//                     <div className="space-y-2">
//                       <div className="flex space-x-4">
//                         <div className="flex-1">
//                           <Label htmlFor="first_name" className="text-sm text-gray-500">First Name</Label>
//                           <Input
//                             id="first_name"
//                             name="first_name"
//                             value={editedInfo.first_name}
//                             onChange={handleChange}
//                             className="border-gray-300 mt-1"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <Label htmlFor="last_name" className="text-sm text-gray-500">Last Name</Label>
//                           <Input
//                             id="last_name"
//                             name="last_name"
//                             value={editedInfo.last_name}
//                             onChange={handleChange}
//                             className="border-gray-300 mt-1"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <p className="text-gray-700">{`${userInfo?.first_name} ${userInfo?.last_name}`}</p>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="email" className="text-sm text-gray-500">Email</Label>
//                   {isEditingAccount ? (
//                     <Input
//                       readOnly
//                       id="email"
//                       name="email"
//                       value={editedInfo?.email}
//                       onChange={handleChange}
//                       className={`border-gray-300 ${isEditingAccount && "bg-muted"}`}
//                     />
//                   ) : (
//                     <p className="text-gray-700">{userInfo?.email}</p>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="company_name" className="text-sm text-gray-500">Company</Label>
//                   {isEditingAccount ? (
//                     <Input
//                       id="company_name"
//                       name="company_name"
//                       value={editedInfo?.company_name}
//                       onChange={handleChange}
//                       className="border-gray-300"
//                     />
//                   ) : (
//                     <p className={`text-gray-700 ${!userInfo?.company_name && "!text-gray-400 italic"}`}>{userInfo?.company_name || "Add Your Company Name"}</p>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="created_at" className="text-sm text-gray-500">Joined at</Label>
//                   <p className="text-gray-700">{formatDate(userInfo?.created_at)}</p>
//                 </div>
//               </>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="shadow-md mb-4">
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-xl font-normal">Additional Information</CardTitle>
//           {!isLoading && !isEditingLocation && (
//             <Button variant="ghost" size="icon" onClick={() => handleEdit('location')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
//               <Pen className="h-4 w-4" />
//               <span className="sr-only">Edit location</span>
//             </Button>
//           )}
//           {isEditingLocation && (
//             <div className="flex space-x-2">
//               <Button variant="ghost" size="icon" onClick={() => handleCancel('location')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
//                 <X className="h-4 w-4" />
//                 <span className="sr-only">Cancel edit</span>
//               </Button>
//               <Button variant="ghost" size="icon" onClick={() => handleSave('location')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
//                 <Check className="h-4 w-4" />
//                 <span className="sr-only">Save changes</span>
//               </Button>
//             </div>
//           )}
//         </CardHeader>
//         <CardContent className="pt-0">
//           <div className="space-y-4">
//             {isLoading ? (
//               <>
//                 <SkeletonField />
//                 <SkeletonField />
//               </>
//             ) : (
//               <>
//                 <div>
//                   <Label htmlFor="phone" className="text-sm text-gray-500">Phone Number</Label>
//                   {isEditingLocation ? (
//                     <Input
//                       id="phone"
//                       name="phone"
//                       value={editedInfo?.phone}
//                       onChange={handleChange}
//                       className="border-gray-300"
//                     />
//                   ) : (
//                     <p className={`text-gray-700 ${!userInfo?.phone && "!text-gray-400 italic"}`}>{userInfo?.phone || "Add Your Phone Number"}</p>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="location" className="text-sm text-gray-500">Location</Label>
//                   {isEditingLocation ? (
//                     <Input
//                       id="location"
//                       name="location"
//                       value={editedInfo?.location}
//                       onChange={handleChange}
//                       className="border-gray-300"
//                     />
//                   ) : (
//                     <p className={`text-gray-700 ${!userInfo?.location && "!text-gray-400 italic"}`}>{userInfo?.location  || "Add Your Location"}</p>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

import { Progress } from "@/components/ui/progress"
import { FileText, Brain, TrendingUp, TrendingDown } from "lucide-react"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Pen, X, Check, User, Briefcase, Mail, Calendar, Phone, MapPin, Building } from "lucide-react"
import { AppContext } from '@/context/AppContext'
import { useContext, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CreditCard } from "lucide-react"

const URL = "http://localhost:5000/api/v1"
const Production = "https://dsf-saas.onrender.com/api/v1"

export default function ContactInfo() {
  const [userInfo, setUserInfo] = useState(null)
  const [isEditingAccount, setIsEditingAccount] = useState(false)
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [editedInfo, setEditedInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useContext(AppContext);
  const { token } = auth;


  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${Production}/settings/profile`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const data = await response.json()
      await new Promise((res) => setTimeout(res,2000))

      setUserInfo(data.data)
      setEditedInfo(data.data)
    } catch (error) {
      console.error('Error fetching user info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (section) => {
    if (section === 'account') {
      setIsEditingAccount(true)
    } else if (section === 'location') {
      setIsEditingLocation(true)
    }
  }

  const handleCancel = (section) => {
    setEditedInfo(userInfo)
    if (section === 'account') {
      setIsEditingAccount(false)
    } else if (section === 'location') {
      setIsEditingLocation(false)
    }
  }

  const handleSave = async (section) => {
    try {
      const response = await fetch(`${Production}/settings/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: `${editedInfo.first_name} ${editedInfo.last_name}`,
          first_name: editedInfo.first_name,
          last_name: editedInfo.last_name,
          phone: editedInfo.phone,
          company_name: editedInfo.company_name,
          location: editedInfo.location,
        }),
      })
      if (response.ok) {
        setUserInfo(editedInfo)
        if (section === 'account') {
          setIsEditingAccount(false)
        } else if (section === 'location') {
          setIsEditingLocation(false)
        }
      } else {
        console.error('Error updating user info')
      }
    } catch (error) {
      console.error('Error updating user info:', error)
    }
  }

  const handleChange = (e) => {
    setEditedInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const SkeletonField = () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-6 w-full" />
    </div>
  )

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact info</h1>
      <div className='md:flex gap-6'>
        <Card className="mb-4 shadow-md basis-1/2 ">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl text-gray-800 flex items-center font-semibold">
              <User className="mr-2 h-5 w-5" />
              My Account
            </CardTitle>
            {!isLoading && !isEditingAccount && (
              <Button variant="ghost" size="icon" onClick={() => handleEdit('account')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                <Pen className="h-4 w-4" />
                <span className="sr-only">Edit account</span>
              </Button>
            )}
            {isEditingAccount && (
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleCancel('account')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancel edit</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleSave('account')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Save changes</span>
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-2.5">
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <SkeletonField />
                  <SkeletonField />
                  <SkeletonField />
                  <SkeletonField />
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="profileId" className="mb-1 text-sm text-gray-500 flex items-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      User ID
                    </Label>
                    <p className="text-gray-700 ml-6">{userInfo?.profileId}</p>
                  </div>
                  <div>
                    <Label htmlFor="name" className="mb-1 text-sm text-gray-500 flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {!isEditingAccount && "Full Name"}
                    </Label>
                    {isEditingAccount ? (
                      <div className="space-y-2">
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <Label htmlFor="first_name" className="mb-1 text-sm text-gray-500">First Name</Label>
                            <Input
                              id="first_name"
                              name="first_name"
                              value={editedInfo.first_name}
                              onChange={handleChange}
                              className="border-gray-300 mt-1"
                            />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor="last_name" className="mb-1 text-sm text-gray-500">Last Name</Label>
                            <Input
                              id="last_name"
                              name="last_name"
                              value={editedInfo.last_name}
                              onChange={handleChange}
                              className="border-gray-300 mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 ml-6 ">{`${userInfo?.first_name} ${userInfo?.last_name}`}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1 text-sm text-gray-500 flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Label>
                    {isEditingAccount ? (
                      <Input
                        readOnly
                        id="email"
                        name="email"
                        value={editedInfo?.email}
                        onChange={handleChange}
                        className={`border-gray-300 ${isEditingAccount && "bg-muted"}`}
                      />
                    ) : (
                      <p className="text-gray-700 ml-6">{userInfo?.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company_name" className="mb-1 text-sm text-gray-500 flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      Company
                    </Label>
                    {isEditingAccount ? (
                      <Input
                        id="company_name"
                        name="company_name"
                        value={editedInfo?.company_name}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className={`text-gray-700 ml-6 ${!userInfo?.company_name && "!text-gray-400 italic"}`}>{userInfo?.company_name || "Add Your Company Name"}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="created_at" className="mb-1 text-sm text-gray-500 flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Joined at
                    </Label>
                    <p className="text-gray-700 ml-6">{formatDate(userInfo?.created_at)}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md mb-4 basis-1/2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold flex items-center text-gray-800">
              <MapPin className="mr-2 h-5 w-5" />
              Additional Information
            </CardTitle>
            {!isLoading && !isEditingLocation && (
              <Button variant="ghost" size="icon" onClick={() => handleEdit('location')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                <Pen className="h-4 w-4" />
                <span className="sr-only">Edit location</span>
              </Button>
            )}
            {isEditingLocation && (
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleCancel('location')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancel edit</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleSave('location')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Save changes</span>
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-2.5">
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <SkeletonField />
                  <SkeletonField />
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="phone" className="mb-1 text-sm text-gray-500 flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      Phone Number
                    </Label>
                    {isEditingLocation ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={editedInfo?.phone}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className={`text-gray-700 ml-6 ${!userInfo?.phone && "!text-gray-400 italic"}`}>{userInfo?.phone || "Add Your Phone Number"}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="location" className="mb-1 text-sm text-gray-500 flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      Location
                    </Label>
                    {isEditingLocation ? (
                      <Input
                        id="location"
                        name="location"
                        value={editedInfo?.location}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className={`text-gray-700 ml-6 ${!userInfo?.location && "!text-gray-400 italic"}`}>{userInfo?.location  || "Add Your Location"}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
       <MembershipSubscription />
        <UserLimits />
    </div>
  )
}





 function UserLimits() {
  const [cardData, setCardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useContext(AppContext)
  const { token } = auth

  const Production = "https://dsf-saas.onrender.com/api/v1"

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${Production}/activities/dashboard-submissions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const data = await response.json()
        setCardData(data.data)
      } catch (error) {
        console.error('Error fetching dashboard submission counts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [token])

  const userDataST = [
    {
      name: "SmartDoc",
      icon: <FileText size={20} />,
      merge: "Total Submissions",
      count: cardData?.SmartDoc?.totalSubmissions || 0,
      increment: cardData?.SmartDoc ? ((cardData?.SmartDoc?.totalSubmissions / 1000) * 100).toFixed(2) : 0,
      remaining: cardData?.SmartDoc?.remainingSubmissions || 0
    },
    {
      name: "GenAI",
      icon: <Brain size={20} />,
      merge: "Total Submissions",
      count: cardData?.GenAI?.totalSubmissions || 0,
      increment: cardData?.GenAI ? ((cardData?.GenAI?.totalSubmissions / 1000) * 100).toFixed(2) : 0,
      remaining: cardData?.GenAI?.remainingSubmissions || 0
    }
  ]

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Usage Limits</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {userDataST.map((box, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-normal flex items-center">
                <div className="mr-2 p-1 bg-gray-100 rounded-md">
                  {box.icon}
                </div>
                {box.name} Credits
              </CardTitle>
              <div className={`flex items-center text-sm ${Number(box.increment) > 0 ? "text-green-600" : "text-red-600"}`}>
                {Number(box.increment) > 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                {box.increment}%
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{box.merge}</span>
                    <span>{box.count}</span>
                  </div>
                  <Progress value={(box.count / (box.count + box.remaining)) * 100} className="h-2" />
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-500">Remaining:</span>
                    <span className="font-semibold">{box.remaining}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}




// Mock data (replace with actual API call later)
const mockSubscriptionData = {
  membershipType: "Pro",
  startDate: "2023-01-01T00:00:00Z",
  expiryDate: "2024-01-01T00:00:00Z"
}

function MembershipSubscription() {
  const [subscriptionData, setSubscriptionData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Replace this with actual API call when ready
        await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay
        setSubscriptionData(mockSubscriptionData)
      } catch (error) {
        console.error('Error fetching subscription data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getMembershipColor = (type) => {
    switch (type.toLowerCase()) {
      case 'basic':
        return 'bg-blue-100 text-blue-800'
      case 'pro':
        return 'bg-purple-100 text-purple-800'
      case 'enterprise':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Membership Subscription
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        ) : subscriptionData ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 mr-2">Membership Type:</span>
              <Badge className={`${getMembershipColor(subscriptionData.membershipType)}`}>
                {subscriptionData.membershipType}
              </Badge>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500 mr-2">Start Date:</span>
              <span className="text-sm">{formatDate(subscriptionData.startDate)}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500 mr-2">Expiry Date:</span>
              <span className="text-sm">{formatDate(subscriptionData.expiryDate)}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No subscription data available.</p>
        )}
      </CardContent>
    </Card>
  )
}