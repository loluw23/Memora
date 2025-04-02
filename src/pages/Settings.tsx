
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BellRing, Globe, Lock, Moon, Palette, Shield, User } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const notificationSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  weeklyDigest: z.boolean().default(false),
  studyReminders: z.boolean().default(true),
});

const appearanceSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  colorScheme: z.enum(['purple', 'blue', 'green', 'orange']).default('purple'),
});

type NotificationSettings = z.infer<typeof notificationSchema>;
type AppearanceSettings = z.infer<typeof appearanceSchema>;

const Settings = () => {
  const { toast } = useToast();
  
  const notificationForm = useForm<NotificationSettings>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyDigest: false,
      studyReminders: true,
    },
  });

  const appearanceForm = useForm<AppearanceSettings>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme: 'system',
      colorScheme: 'purple',
    },
  });

  function onNotificationSubmit(data: NotificationSettings) {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
    console.log(data);
  }

  function onAppearanceSubmit(data: AppearanceSettings) {
    toast({
      title: "Appearance settings updated",
      description: "Your display preferences have been saved.",
    });
    console.log(data);
  }

  return (
    <MainLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your application preferences</p>
      </div>

      <Tabs defaultValue="account" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <TabsList className="mb-6">
          <TabsTrigger value="account" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            <User size={16} className="mr-1" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            <BellRing size={16} className="mr-1" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            <Palette size={16} className="mr-1" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
            <Lock size={16} className="mr-1" />
            Privacy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Account settings will be available soon.</p>
              <Button className="bg-memora-purple">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-4">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email notifications about your account activity
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="pushNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Push Notifications</FormLabel>
                          <FormDescription>
                            Receive push notifications for important updates
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="weeklyDigest"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Weekly Digest</FormLabel>
                          <FormDescription>
                            Receive a weekly summary of your study progress
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="studyReminders"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Study Reminders</FormLabel>
                          <FormDescription>
                            Receive reminders for scheduled study sessions
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="bg-memora-purple">Save Preferences</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how Memora looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appearanceForm}>
                <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormItem>
                      <FormLabel>Theme</FormLabel>
                      <div className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Moon size={20} className="text-muted-foreground" />
                          <span>Dark Mode settings coming soon</span>
                        </div>
                      </div>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Color Scheme</FormLabel>
                      <div className="flex gap-4 mt-2">
                        <div className="h-10 w-10 rounded-full bg-memora-purple border-2 border-primary cursor-pointer" />
                        <div className="h-10 w-10 rounded-full bg-blue-500 border-2 border-transparent cursor-pointer opacity-50" />
                        <div className="h-10 w-10 rounded-full bg-green-500 border-2 border-transparent cursor-pointer opacity-50" />
                        <div className="h-10 w-10 rounded-full bg-orange-400 border-2 border-transparent cursor-pointer opacity-50" />
                      </div>
                      <FormDescription className="mt-2">
                        Custom color schemes coming soon
                      </FormDescription>
                    </FormItem>
                  </div>
                  
                  <Button type="submit" className="bg-memora-purple">Save Appearance</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>
                Manage your security settings and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-memora-purple" />
                  <div>
                    <h3 className="text-lg font-medium">Data Privacy</h3>
                    <p className="text-muted-foreground">
                      Control how your data is stored and used within Memora.
                      Privacy settings coming soon.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Lock className="h-8 w-8 text-memora-purple" />
                  <div>
                    <h3 className="text-lg font-medium">Account Security</h3>
                    <p className="text-muted-foreground">
                      Manage password, two-factor authentication, and security preferences.
                      Security settings coming soon.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Globe className="h-8 w-8 text-memora-purple" />
                  <div>
                    <h3 className="text-lg font-medium">Connectivity & Sharing</h3>
                    <p className="text-muted-foreground">
                      Control how your content can be shared with others.
                      Sharing settings coming soon.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
