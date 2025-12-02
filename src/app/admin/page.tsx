'use client';

import { useState } from 'react';
import { api } from '@/libs/api';

const AROMA_OPTIONS = {
  CHERRY: 'CHERRY',
  BERRY: 'BERRY',
  OAK: 'OAK',
  VANILLA: 'VANILLA',
  PEPPER: 'PEPPER',
  BAKING: 'BAKING',
  GRASS: 'GRASS',
  APPLE: 'APPLE',
  PEACH: 'PEACH',
  CITRUS: 'CITRUS',
  TROPICAL: 'TROPICAL',
  MINERAL: 'MINERAL',
  FLOWER: 'FLOWER',
  TOBACCO: 'TOBACCO',
  EARTH: 'EARTH',
  CHOCOLATE: 'CHOCOLATE',
  SPICE: 'SPICE',
  CARAMEL: 'CARAMEL',
  LEATHER: 'LEATHER',
};

const AROMA_LIST = Object.values(AROMA_OPTIONS);

// DELETE API
async function deleteWine(id: number) {
  const res = await api.delete(`/wines/${id}`);
  return res.data;
}

// IMAGE UPLOAD API
async function uploadImage(file: File) {
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
async function createWine(data: {
  name: string;
  region: string;
  image: string;
  price: number;
  type: 'RED' | 'WHITE' | 'ROSE' | 'SPARKLING';
}) {
  const res = await api.post('/wines', data);
  return res.data;
}

// CREATE REVIEW API
async function createReview(data: {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: number;
}) {
  const res = await api.post('/reviews', data);
  return res.data;
}

export default function WineAdmin() {
  const [deleteId, setDeleteId] = useState('');
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    region: '',
    image: '', // 업로드한 이미지 URL 저장됨
    price: 39900,
    type: 'RED',
  });

  const [reviewForm, setReviewForm] = useState({
    rating: 1,
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: [] as string[],
    content: '',
    wineId: 0,
  });

  // 향 체크
  const handleAromaToggle = (value: string) => {
    setReviewForm((prev) => {
      const exists = prev.aroma.includes(value);

      return {
        ...prev,
        aroma: exists ? prev.aroma.filter((item) => item !== value) : [...prev.aroma, value],
      };
    });
  };

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
      price: 39900,
      type: 'RED',
    });
  };

  // 리뷰 생성
  const handleCreateReview = async () => {
    await createReview({
      rating: Number(reviewForm.rating),
      lightBold: Number(reviewForm.lightBold),
      smoothTannic: Number(reviewForm.smoothTannic),
      drySweet: Number(reviewForm.drySweet),
      softAcidic: Number(reviewForm.softAcidic),
      aroma: reviewForm.aroma,
      content: reviewForm.content,
      wineId: Number(reviewForm.wineId),
    });

    console.log('리뷰 등록 완료!');

    setReviewForm({
      rating: 0,
      lightBold: 0,
      smoothTannic: 0,
      drySweet: 0,
      softAcidic: 0,
      aroma: [],
      content: '',
      wineId: 0,
    });
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
        <h2>와인 삭제</h2>
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
            style={{
              padding: '8px 12px',
              background: '#e74c3c',
              color: '#fff',
              borderRadius: '6px',
            }}
          >
            삭제
          </button>
        </div>

        <h2>와인 등록</h2>
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
            style={{
              padding: '8px 12px',
              background: '#3498db',
              color: '#fff',
              borderRadius: '6px',
            }}
          >
            등록하기
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
        <h2>리뷰 등록</h2>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <strong>1~5 까지 별점 등록</strong>
          <input
            type="number"
            placeholder="rating"
            min="1"
            max="5"
            value={reviewForm.rating}
            onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
          />

          <strong>0~10까지 바디감</strong>
          <input
            type="number"
            placeholder="lightBold"
            max="10"
            value={reviewForm.lightBold}
            onChange={(e) => setReviewForm({ ...reviewForm, lightBold: Number(e.target.value) })}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
          />

          <strong>0~10까지 타닌</strong>
          <input
            type="number"
            placeholder="smoothTannic"
            max="10"
            value={reviewForm.smoothTannic}
            onChange={(e) => setReviewForm({ ...reviewForm, smoothTannic: Number(e.target.value) })}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
          />

          <strong>0~10까지 당도</strong>
          <input
            type="number"
            placeholder="drySweet"
            max="10"
            value={reviewForm.drySweet}
            onChange={(e) => setReviewForm({ ...reviewForm, drySweet: Number(e.target.value) })}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
          />

          <strong>0~10까지 산미</strong>
          <input
            type="number"
            placeholder="softAcidic"
            max="10"
            value={reviewForm.softAcidic}
            onChange={(e) => setReviewForm({ ...reviewForm, softAcidic: Number(e.target.value) })}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
          />

          <strong>향 체크</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {AROMA_LIST.map((aroma) => (
              <label key={aroma} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="checkbox"
                  checked={reviewForm.aroma.includes(aroma)}
                  onChange={() => handleAromaToggle(aroma)}
                />
                {aroma}
              </label>
            ))}
          </div>

          <strong>리뷰 평</strong>
          <textarea
            placeholder="content"
            value={reviewForm.content}
            onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              height: '80px',
            }}
          />

          <strong>와인 ID</strong>
          <input
            type="number"
            placeholder="wineId"
            value={reviewForm.wineId}
            onChange={(e) => setReviewForm({ ...reviewForm, wineId: Number(e.target.value) })}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
          />

          <button
            onClick={handleCreateReview}
            style={{
              padding: '8px 12px',
              background: '#8e44ad',
              color: '#fff',
              borderRadius: '6px',
            }}
          >
            리뷰 등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
