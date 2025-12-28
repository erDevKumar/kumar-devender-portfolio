import { NextResponse } from 'next/server';
import { getAdminPassword } from '@/lib/firebase-admin';
import { getRemoteConfig } from 'firebase-admin/remote-config';
import { getApps } from 'firebase-admin/app';

export async function GET() {
  try {
    const apps = getApps();
    const debugInfo: any = {
      firebaseInitialized: apps.length > 0,
      appCount: apps.length,
      hasServiceAccount: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
      hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'erkumardevender',
    };

    if (apps.length > 0) {
      try {
        const rc = getRemoteConfig(apps[0]);
        const template = await rc.getTemplate();
        
        debugInfo.remoteConfig = {
          hasTemplate: !!template,
          parameterCount: Object.keys(template.parameters || {}).length,
          parameterKeys: Object.keys(template.parameters || {}),
          hasAdminPassword: !!template.parameters?.admin_password,
        };

        if (template.parameters?.admin_password) {
          const param = template.parameters.admin_password;
          debugInfo.adminPasswordParam = {
            hasDefaultValue: !!param.defaultValue,
            defaultValueType: typeof param.defaultValue,
            defaultValueKeys: param.defaultValue ? Object.keys(param.defaultValue as any) : [],
            defaultValueStructure: param.defaultValue,
          };
        }

        // Try to get the password
        const password = await getAdminPassword();
        debugInfo.passwordRetrieved = !!password;
        debugInfo.passwordLength = password ? password.length : 0;
      } catch (rcError: any) {
        debugInfo.remoteConfigError = {
          message: rcError.message,
          code: rcError.code,
        };
      }
    }

    return NextResponse.json(debugInfo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Debug failed',
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

