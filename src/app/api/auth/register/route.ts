import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password, firstName, lastName } = await req.json();

    if (!username || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Ad, soyad, kullanıcı adı ve şifre zorunludur.' },
        { status: 400 }
      );
    }

    const trimmedUsername = username.trim().toLowerCase();
    if (trimmedUsername.length < 3) {
      return NextResponse.json(
        { error: 'Kullanıcı adı en az 3 karakter olmalıdır.' },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { error: 'Şifre en az 4 karakter olmalıdır.' },
        { status: 400 }
      );
    }

    // Kullanıcı adı kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { username: trimmedUsername }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu kullanıcı adı zaten kullanılıyor. Lütfen başka bir kullanıcı adı seçin.' },
        { status: 409 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı oluştur (isExternal: true)
    const newUser = await prisma.user.create({
      data: {
        username: trimmedUsername,
        password: hashedPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role: 'STUDENT',
        isExternal: true,
      }
    });

    // Oturum Token'ı üret
    const token = await signToken({
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName
    });

    const response = NextResponse.json({
      message: 'Kayıt başarılı! Hoş geldiniz.',
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        isExternal: true
      }
    });

    // Otomatik giriş çerezi (cookie)
    response.cookies.set({
      name: 'parmak_token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 gün
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Kayıt işlemi sırasında bir sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
