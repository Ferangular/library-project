# 🚀 First Library

A modern Angular (v17+) library built with **standalone components**, **Signals**, and **clean architecture**.

This library provides reusable UI components and services designed to be:
- scalable
- reusable
- easy to integrate
- ready for npm distribution

---

# ✨ Features

- ✅ Standalone components (no NgModules)
- ✅ Angular Signals for state management
- ✅ OnPush change detection
- ✅ Modern template syntax (`@if`, `@for`)
- ✅ Clean and scalable architecture
- ✅ Theming support via CSS variables

---

# 📦 Installation

```bash
npm install @tu-usuario/first-library
```

🧩 Available Components & Services

## UI Components
- `lib-card` → container component
- `lib-button` → reusable button with variants
- `lib-notification` → notification UI component

## Services
- `NotificationService` → global notification state

🚀 Usage

### 1. Import components
```typescript
import { Component, inject } from '@angular/core';
import {
  CardComponent,
  ButtonComponent,
  NotificationComponent,
  NotificationService
} from '@tu-usuario/first-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, ButtonComponent, NotificationComponent],
  templateUrl: './app.html',
})
export class AppComponent {
  private readonly notificationService = inject(NotificationService);

  showSuccess(): void {
    this.notificationService.showSuccess('Operation successful');
  }

  showError(): void {
    this.notificationService.showError('Something went wrong');
  }

  showInfo(): void {
    this.notificationService.showInfo('Information message');
  }
}
```

### 2. Use in template
```html
<lib-card title="First Library Demo" subtitle="Reusable components example">
  <p>
    This content is rendered using components from the library.
  </p>

  <div class="actions">
    <lib-button variant="primary" (pressed)="showSuccess()">
      Success
    </lib-button>

    <lib-button variant="secondary" (pressed)="showInfo()">
      Info
    </lib-button>

    <lib-button variant="danger" (pressed)="showError()">
      Error
    </lib-button>
  </div>

  <lib-notification></lib-notification>
</lib-card>
```

🎨 Theming

All components support customization via CSS variables.
Example:
```css
lib-card {
  --lib-card-bg: #1f2937;
  --lib-card-title: #f9fafb;
  --lib-card-text: #d1d5db;
}
```

🧠 Architecture

The library follows a feature-based structure:
```
lib/
  ui/
    button/
    card/
    notification/
  services/
  models/
  tokens/
```

## Principles
- Components are stateless and reusable
- Services manage state using Signals
- Public API is controlled via public-api.ts
- No tight coupling between components

🏗️ Development

## Generate components
```bash
ng g c ui/component-name --project=first-library
```

## Build library
```bash
ng build first-library
```

📦 Publishing

## Build library:
```bash
ng build first-library
```

## Go to dist folder:
```bash
cd dist/first-library
```

## Publish:
```bash
npm publish --access public
```

🧪 Testing
```bash
ng test
```

📚 Example API
```typescript
const notification = inject(NotificationService);

notification.showSuccess('Saved successfully');
notification.showError('Error occurred');
notification.showInfo('Info message');
notification.hide();
```

⚠️ Best Practices

## Import only from public API:
```typescript
import { CardComponent } from '@tu-usuario/first-library';
```

## ❌ Do NOT import from internal paths:
```typescript
// ❌ wrong
import { CardComponent } from 'projects/first-library/...';
```

🔮 Roadmap
- Modal component
- Form components
- Theme presets
- Accessibility improvements

👨‍💻 Author
Your Name
