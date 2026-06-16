#!/bin/bash
# Rentiers Pro — запуск сборки
# Выполните в Terminal: cd в папку rentiers-website, затем bash BUILD.sh

set -e

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building project..."
npm run build

echo "✅ Build complete! To preview: npm run start"
echo "   To develop: npm run dev"
