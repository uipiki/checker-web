import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>プライバシーポリシー</h1>
        <p className="last-updated">最終更新日: 2024年10月5日</p>

        <section>
          <h2>1. はじめに</h2>
          <p>
            プライズチェッカーNow（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
            本プライバシーポリシーは、当サイトがどのように情報を収集、使用、保護するかを説明するものです。
          </p>
        </section>

        <section>
          <h2>2. 収集する情報</h2>
          <h3>2.1 自動的に収集される情報</h3>
          <p>当サイトでは、以下の情報を自動的に収集します：</p>
          <ul>
            <li>アクセス日時</li>
            <li>IPアドレス</li>
            <li>ブラウザの種類とバージョン</li>
            <li>デバイス情報</li>
            <li>閲覧ページ</li>
          </ul>

          <h3>2.2 ユーザーが入力する情報</h3>
          <p>当サイトでは、以下の情報を記録します：</p>
          <ul>
            <li>選択したトーナメント情報</li>
            <li>入力したエントリ数</li>
          </ul>
          <p>これらの情報は統計分析のためにのみ使用され、個人を特定する情報は収集しません。</p>
        </section>

        <section>
          <h2>3. Cookieの使用</h2>
          <p>
            当サイトでは、サービスの向上およびユーザー体験の改善のためにCookieを使用します。
            Cookieは、ウェブサイトがユーザーのデバイスに保存する小さなテキストファイルです。
          </p>
          <h3>3.1 使用するCookie</h3>
          <ul>
            <li><strong>必須Cookie</strong>: サイトの基本機能を提供するために必要</li>
            <li><strong>分析Cookie</strong>: サイトの利用状況を分析するために使用</li>
            <li><strong>広告Cookie</strong>: 関連性の高い広告を表示するために使用</li>
          </ul>
        </section>

        <section>
          <h2>4. Google AdSenseについて</h2>
          <p>
            当サイトでは、広告配信サービス「Google AdSense」を使用しています。
            Google AdSenseは、Cookieを使用してユーザーの興味に応じた広告を配信します。
          </p>
          <p>
            Cookieを無効にする方法や、Google AdSenseのプライバシーポリシーについては、
            <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">
              Googleの広告ポリシー
            </a>
            をご覧ください。
          </p>
        </section>

        <section>
          <h2>5. 情報の使用目的</h2>
          <p>収集した情報は、以下の目的で使用します：</p>
          <ul>
            <li>サービスの提供と改善</li>
            <li>利用状況の分析</li>
            <li>広告の配信</li>
            <li>不正行為の防止</li>
          </ul>
        </section>

        <section>
          <h2>6. 情報の第三者提供</h2>
          <p>
            当サイトは、法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。
            ただし、以下のサービスを利用しています：
          </p>
          <ul>
            <li>Google AdSense（広告配信）</li>
            <li>Supabase（データベース）</li>
            <li>Vercel（ホスティング）</li>
          </ul>
        </section>

        <section>
          <h2>7. セキュリティ</h2>
          <p>
            当サイトは、収集した情報の漏洩、紛失、または不正アクセスを防ぐため、
            適切なセキュリティ対策を講じています。
          </p>
        </section>

        <section>
          <h2>8. プライバシーポリシーの変更</h2>
          <p>
            当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
            変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じます。
          </p>
        </section>

        <section>
          <h2>9. お問い合わせ</h2>
          <p>
            本プライバシーポリシーに関するお問い合わせは、
            以下のフォームからお願いいたします。
          </p>
          <p>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScgwUW_Mht79FXYvuLwh-wmN0qIEVJ54BTmydOHfM4L1GHDXw/viewform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              お問い合わせフォーム
            </a>
          </p>
        </section>

        <div className="back-link">
          <a href="/">トップページに戻る</a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
