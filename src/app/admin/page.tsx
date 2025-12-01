'use client';

import { useState } from 'react';
import { api } from '@/libs/api';

// DELETE API
export async function deleteWine(id: number) {
  const res = await api.delete(`/wines/${id}`);
  return res.data;
}

// IMAGE UPLOAD API
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('image', file); // 서버에서 name="image" 로 받는다고 가정

  const res = await api.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data; // 서버가 imageUrl을 res.data.image 로 준다고 가정
}

// CREATE WINE API
export async function createWine(data: {
  name: string;
  region: string;
  image: string;
  price: number;
  type: 'RED' | 'WHITE' | 'ROSE' | 'SPARKLING';
}) {
  const res = await api.post('/wines', data);
  return res.data;
}

export default function WineAdmin() {
  const [deleteId, setDeleteId] = useState('');
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    region: '',
    image: '', // 업로드한 이미지 URL 저장됨
    price: 0,
    type: 'RED',
  });

  // DELETE
  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteWine(Number(deleteId));
    console.log(`${deleteId} 삭제 완료!`);
    setDeleteId('');
  };

  // IMAGE UPLOAD (input file)
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const result = await uploadImage(file);

    setForm((prev) => ({ ...prev, image: result.url }));
    setUploading(false);
  };

  // CREATE
  const handleCreate = async () => {
    if (!form.image) {
      console.log('이미지를 먼저 업로드해야 합니다.');
      return;
    }

    await createWine({
      name: form.name,
      region: form.region,
      image: form.image,
      price: Number(form.price),
      type: form.type as any,
    });

    console.log('등록 완료!');
    setForm({
      name: '',
      region: '',
      image: '',
      price: 0,
      type: 'RED',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      {/* DELETE */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="number"
          placeholder="삭제할 wine ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
        />
        <button
          onClick={handleDelete}
          style={{ padding: '8px 12px', background: '#e74c3c', color: '#fff', borderRadius: '6px' }}
        >
          삭제
        </button>
      </div>

      {/* CREATE */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          placeholder="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
        />

        <input
          placeholder="region"
          value={form.region}
          onChange={(e) => setForm({ ...form, region: e.target.value })}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
        />

        <input
          type="number"
          placeholder="price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
        />

        {/* IMAGE FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ padding: '8px' }}
        />

        {uploading && <p>이미지 업로드 중...</p>}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            style={{ width: '120px', borderRadius: '6px', marginTop: '10px' }}
          />
        )}

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
        >
          <option value="RED">RED</option>
          <option value="WHITE">WHITE</option>
          <option value="ROSE">ROSE</option>
          <option value="SPARKLING">SPARKLING</option>
        </select>

        <button
          onClick={handleCreate}
          style={{ padding: '8px 12px', background: '#3498db', color: '#fff', borderRadius: '6px' }}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
