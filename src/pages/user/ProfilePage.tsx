import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { updateProfile } from '@/features/auth/authSlice';
import { authAPI } from '@/services/api';

const profileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

export function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (!user) return null;

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Formik
                initialValues={{ name: user.name, email: user.email }}
                validationSchema={profileSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    await dispatch(updateProfile(values)).unwrap();
                    toast.success('Profile updated successfully');
                  } catch (error: any) {
                    toast.error(error.message || 'Failed to update profile');
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        error={errors.name && touched.name}
                      />
                      {errors.name && touched.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        error={errors.email && touched.email}
                      />
                      {errors.email && touched.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabsContent>

            <TabsContent value="password">
              <Formik
                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                validationSchema={passwordSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    await authAPI.updatePassword(values.oldPassword, values.newPassword);
                    toast.success('Password updated successfully');
                    resetForm();
                  } catch (error: any) {
                    toast.error(error.message || 'Failed to update password');
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="oldPassword">Old Password</Label>
                      <Field
                        as={Input}
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        error={errors.oldPassword && touched.oldPassword}
                      />
                      {errors.oldPassword && touched.oldPassword && (
                        <p className="text-sm text-destructive">{errors.oldPassword}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Field
                        as={Input}
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        error={errors.newPassword && touched.newPassword}
                      />
                      {errors.newPassword && touched.newPassword && (
                        <p className="text-sm text-destructive">{errors.newPassword}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Field
                        as={Input}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        error={errors.confirmPassword && touched.confirmPassword}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Updating...' : 'Update Password'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
