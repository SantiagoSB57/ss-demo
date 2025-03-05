import { NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';
import { ref, listAll } from 'firebase/storage';

export async function GET() {
    try {
        const storageRef = ref(storage, 'test/'); // ✅ Listar archivos en 'test/' 
        const result = await listAll(storageRef);

        const files = result.items.map(item => item.fullPath);
        return NextResponse.json({ success: true, files });
    } catch (error) {
        console.error("Storage Error:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}